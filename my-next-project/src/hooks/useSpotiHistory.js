import { useEffect, useState, useMemo } from "react";
import { dadosHistory } from "@/pages/api/hello";

export function useSpotiHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dadosHistory()
      .then(setHistory)
      .finally(() => setLoading(false));
  }, []);

  // ✅ Função pura: calcula a data mais recente DO PRÓPRIO conjunto de dados
  const filterByPeriod = (data, period) => {
  if (period === "all") return data;
  if (!Array.isArray(data) || data.length === 0) return [];

  const validDates = data
    .map(item => {
      const d = new Date(item?.ts);
      return isNaN(d.getTime()) ? null : d;
    })
    .filter(d => d !== null);

  // 🔥 PROTEÇÃO CRÍTICA: se não há datas válidas, retorna vazio
  if (validDates.length === 0) {
    return [];
  }

  // ✅ Agora é seguro usar Math.max
  const now = new Date(Math.max(...validDates));

  let cutoffDate;
  switch (period) {
    case "4weeks":
      cutoffDate = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000);
      break;
    case "6months":
      cutoffDate = new Date(now);
      cutoffDate.setMonth(cutoffDate.getMonth() - 6);
      break;
    case "1year":
      cutoffDate = new Date(now);
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
      break;
    default:
      return data;
  }

  return data.filter(item => {
    const itemDate = new Date(item?.ts);
    return !isNaN(itemDate.getTime()) && itemDate >= cutoffDate;
  });
};

  // ------------------------
  // Estatísticas Gerais
  // ------------------------
  const contarTotalMusicas = (period = "all") => {
    return filterByPeriod(history, period).length;
  };

  const contarMusicasDiferentes = (period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered.length) return 0;
    const unique = new Set(filtered.map(m => m.master_metadata_track_name));
    return unique.size;
  };

  const totalMinutosOuvidos = (period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered.length) return 0;
    const totalMs = filtered.reduce((acc, m) => acc + (m.ms_played || 0), 0);
    return Math.floor(totalMs / 60000);
  };

  const mediaTempoDiario = (period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered.length) return 0;
    const dias = new Set(filtered.map(m => {
      const d = new Date(m.ts);
      return isNaN(d.getTime()) ? null : d.toDateString();
    }).filter(Boolean));
    const minutos = totalMinutosOuvidos(period);
    return dias.size ? minutos / dias.size : 0;
  };

  const horariosMaisOuvidos = (period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered.length) return [];
    const contagemHoras = {};
    filtered.forEach(m => {
      const d = new Date(m.ts);
      if (isNaN(d.getTime())) return;
      const hora = d.getHours();
      contagemHoras[hora] = (contagemHoras[hora] || 0) + 1;
    });
    return Object.entries(contagemHoras)
      .sort((a, b) => b[1] - a[1])
      .map(([hora]) => parseInt(hora));
  };

  const estacoesMaisOuvidas = (period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered.length) return null;
    const contagemEstacoes = {};
    filtered.forEach(m => {
      const d = new Date(m.ts);
      if (isNaN(d.getTime())) return;
      const month = d.getMonth() + 1;
      let estacao = "";
      if ([12, 1, 2].includes(month)) estacao = "Inverno";
      else if ([3, 4, 5].includes(month)) estacao = "Primavera";
      else if ([6, 7, 8].includes(month)) estacao = "Verão";
      else estacao = "Outono";
      contagemEstacoes[estacao] = (contagemEstacoes[estacao] || 0) + 1;
    });
    const maisOuvida = Object.entries(contagemEstacoes)
      .sort((a, b) => b[1] - a[1])[0];
    return maisOuvida ? maisOuvida[0] : null;
  };

  // ------------------------
  // Top 100
  // ------------------------
  const top100Artistas = (period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered.length) return [];
    const contagem = {};
    filtered.forEach(m => {
      const artista = m.master_metadata_album_artist_name;
      if (artista) contagem[artista] = (contagem[artista] || 0) + 1;
    });
    return Object.entries(contagem)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100)
      .map(([artista, plays]) => ({ artista, plays }));
  };

  const top100MusicasPorDuracao = (period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered.length) return [];
    return [...filtered]
      .filter(m => 
        m.master_metadata_track_name && 
        m.master_metadata_album_artist_name &&
        m.ms_played > 30000
      )
      .sort((a, b) => (b.ms_played || 0) - (a.ms_played || 0))
      .slice(0, 100)
      .map(m => ({
        musica: m.master_metadata_track_name,
        artista: m.master_metadata_album_artist_name,
        ms_played: m.ms_played,
      }));
  };

  // ------------------------
  // Estatísticas de artista
  // ------------------------
  const percentualPlaysDoArtista = (artistaNome, period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered.length) return 0;
    const total = filtered.length;
    const plays = filtered.filter(m => m.master_metadata_album_artist_name === artistaNome).length;
    return total ? (plays / total) * 100 : 0;
  };

  const top20MusicasDoArtista = (artistaNome, period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered.length) return [];
    return filtered
      .filter(m => m.master_metadata_album_artist_name === artistaNome)
      .sort((a, b) => (b.ms_played || 0) - (a.ms_played || 0))
      .slice(0, 20)
      .map(m => ({ musica: m.master_metadata_track_name, ms_played: m.ms_played }));
  };

  const posicaoArtistaTop100 = (artistaNome, period = "all") => {
    const top = top100Artistas(period);
    const idx = top.findIndex(a => a.artista === artistaNome);
    return idx >= 0 ? idx + 1 : null;
  };

  const estacoesDoArtista = (artistaNome, period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered.length) return [];
    const contagemEstacoes = {};
    filtered
      .filter(m => m.master_metadata_album_artist_name === artistaNome)
      .forEach(m => {
        const d = new Date(m.ts);
        if (isNaN(d.getTime())) return;
        const month = d.getMonth() + 1;
        let estacao = "";
        if ([12, 1, 2].includes(month)) estacao = "Inverno";
        else if ([3, 4, 5].includes(month)) estacao = "Primavera";
        else if ([6, 7, 8].includes(month)) estacao = "Verão";
        else estacao = "Outono";
        contagemEstacoes[estacao] = (contagemEstacoes[estacao] || 0) + 1;
      });
    return Object.entries(contagemEstacoes)
      .sort((a, b) => b[1] - a[1])
      .map(([estacao]) => estacao);
  };

  const pesquisar = (termo, period = "all") => {
    const filtered = filterByPeriod(history, period);
    if (!filtered?.length) {
      return { musicas: [], albuns: [], artistas: [] };
    }
    const termoLower = termo.toLowerCase();
    const musicas = filtered.filter(m => m.master_metadata_track_name?.toLowerCase().includes(termoLower));
    const albuns = filtered.filter(m => m.master_metadata_album_name?.toLowerCase().includes(termoLower));
    const artistas = filtered.filter(m => m.master_metadata_album_artist_name?.toLowerCase().includes(termoLower));
    return { musicas, artistas, albuns };
  };

  // -----------------------------------------------------------
  // ⬇️ CÁLCULOS FINAIS (sempre "all")
  // -----------------------------------------------------------

  const totalMusicasValor = useMemo(() => history.length, [history]);

  const topArtistasCalculado = useMemo(() => top100Artistas("all"), [history, top100Artistas]);

  const artistaMaisOuvidoValor = topArtistasCalculado[0]?.artista || 'N/A';

  const primeiraMusicaValor = useMemo(() => 
    history[0] 
      ? `${history[0].master_metadata_track_name} - ${history[0].master_metadata_album_artist_name}`
      : 'N/A',
    [history]
  );

  const top100MusicasArray = useMemo(() => top100MusicasPorDuracao("all"), [history]);

  // -----------------------------------------------------------
  // ⬆️ FIM
  // -----------------------------------------------------------

  return {
    history,
    loading,
    totalMusicasValor,
    primeiraMusicaValor,
    artistaMaisOuvidoValor,
    top100MusicasArray,
    // Funções com suporte a período
    contarTotalMusicas,
    contarMusicasDiferentes,
    totalMinutosOuvidos,
    mediaTempoDiario,
    horariosMaisOuvidos,
    estacoesMaisOuvidas,
    top100Artistas,
    top100MusicasPorDuracao,
    percentualPlaysDoArtista,
    top20MusicasDoArtista,
    posicaoArtistaTop100,
    estacoesDoArtista,
    pesquisar,
  };
}