import { useEffect, useState } from "react";
import { dadosHistory } from "@/pages/api/hello"; // ou fetch("/history.json")

export function useSpotiHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dadosHistory()
      .then(setHistory)
      .finally(() => setLoading(false));
  }, []);

  // ------------------------
  // Estatísticas Gerais
  // ------------------------
  const contarTotalMusicas = () => history?.length || 0;

  const contarMusicasDiferentes = () => {
    if (!history || history.length === 0) return 0;
    const unique = new Set(history.map(m => m.master_metadata_track_name));
    return unique.size;
  };

  const totalMinutosOuvidos = () => {
    if (!history || history.length === 0) return 0;
    const totalMs = history.reduce((acc, m) => acc + (m.ms_played || 0), 0);
    return Math.floor(totalMs / 60000); // ms → minutos
  };

  const mediaTempoDiario = () => {
    if (!history || history.length === 0) return 0;

    const dias = new Set(history.map(m => new Date(m.ts).toDateString()));
    const minutos = totalMinutosOuvidos();
    return minutos / dias.size;
  };

  const horariosMaisOuvidos = () => {
    if (!history || history.length === 0) return [];

    const contagemHoras = {};
    history.forEach(m => {
      const hora = new Date(m.ts).getHours();
      contagemHoras[hora] = (contagemHoras[hora] || 0) + 1;
    });

    return Object.entries(contagemHoras)
      .sort((a, b) => b[1] - a[1])
      .map(([hora, _]) => parseInt(hora));
  };

  const estacoesMaisOuvidas = () => {
    if (!history || history.length === 0) return null;

    const contagemEstacoes = {};
    history.forEach(m => {
      const month = new Date(m.ts).getMonth() + 1;
      let estacao = "";
      if ([12, 1, 2].includes(month)) estacao = "Inverno";
      else if ([3, 4, 5].includes(month)) estacao = "Primavera";
      else if ([6, 7, 8].includes(month)) estacao = "Verão";
      else estacao = "Outono";
      contagemEstacoes[estacao] = (contagemEstacoes[estacao] || 0) + 1;
    });

    // Ordena por contagem e pega a primeira estação que é a mais ouvida
    const maisOuvida = Object.entries(contagemEstacoes)
      .sort((a, b) => b[1] - a[1])[0]; // [estacao, quantidade]

    return maisOuvida ? maisOuvida[0] : null;
  };

  // ------------------------
  // Top 100
  // ------------------------
  const top100Artistas = () => {
    if (!history || history.length === 0) return [];
    const contagem = {};
    history.forEach(m => {
      const artista = m.master_metadata_album_artist_name;
      if (artista) contagem[artista] = (contagem[artista] || 0) + 1;
    });
    return Object.entries(contagem)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100)
      .map(([artista, plays]) => ({ artista, plays }));
  };

  const top100MusicasPorDuracao = () => {
    if (!history || history.length === 0) return [];
return history
    .filter(m => m.master_metadata_track_name)
    .sort((a, b) => (b.ms_played || 0) - (a.ms_played || 0))
    .slice(0, 100)
    .map(m => ({
      musica: m.master_metadata_track_name,
      artista: m.master_metadata_album_artist_name,
      ms_played: m.ms_played,
    }));
  };

  // ------------------------
  // Estatísticas de um artista
  // ------------------------
  const percentualPlaysDoArtista = (artistaNome) => {
    if (!history || history.length === 0) return 0;
    const total = history.length;
    const plays = history.filter(m => m.master_metadata_album_artist_name === artistaNome).length;
    return (plays / total) * 100;
  };

  const top20MusicasDoArtista = (artistaNome) => {
    if (!history || history.length === 0) return [];
    return history
      .filter(m => m.master_metadata_album_artist_name === artistaNome)
      .sort((a, b) => (b.ms_played || 0) - (a.ms_played || 0))
      .slice(0, 20)
      .map(m => ({ musica: m.master_metadata_track_name, ms_played: m.ms_played }));
  };

  const posicaoArtistaTop100 = (artistaNome) => {
    const top = top100Artistas();
    const idx = top.findIndex(a => a.artista === artistaNome);
    return idx >= 0 ? idx + 1 : null;
  };

  const estacoesDoArtista = (artistaNome) => {
    if (!history || history.length === 0) return [];
    const contagemEstacoes = {};
    history
      .filter(m => m.master_metadata_album_artist_name === artistaNome)
      .forEach(m => {
        const month = new Date(m.ts).getMonth() + 1;
        let estacao = "";
        if ([12, 1, 2].includes(month)) estacao = "Inverno";
        else if ([3, 4, 5].includes(month)) estacao = "Primavera";
        else if ([6, 7, 8].includes(month)) estacao = "Verão";
        else estacao = "Outono";
        contagemEstacoes[estacao] = (contagemEstacoes[estacao] || 0) + 1;
      });

    return Object.entries(contagemEstacoes)
      .sort((a, b) => b[1] - a[1])
      .map(([estacao, _]) => estacao);
  };


  // ------------------------
  // Pesquisar
  // ------------------------

  const pesquisar = (termo) => {
    if (!history || !Array.isArray(history) || history.length === 0) return { musicas: [], albuns: [], artistas: [] };

    const termoLower = termo.toLowerCase()

    const musicas = history.filter(m => m.master_metadata_track_name?.toLowerCase().includes(termoLower));
    const albuns = history.filter(m => m.master_metadata_album_album_name?.toLowerCase().includes(termoLower));
    const artistas = history.filter(m => m.master_metadata_album_artist_name?.toLowerCase().includes(termoLower));

    return {
      musicas, artistas, albuns
    }
  }

// -----------------------------------------------------------
// ⬇️ CÁLCULOS FINAIS (Prontos para o componente) ⬇️
// -----------------------------------------------------------

  const totalMusicasValor = contarTotalMusicas(); 

  const topArtistasCalculado = top100Artistas();
  const artistaMaisOuvidoValor = topArtistasCalculado[0]?.artista || 'N/A';

  const primeiraMusicaValor = history[0] 
    ? `${history[0].master_metadata_track_name} - ${history[0].master_metadata_album_artist_name}`
    : 'N/A';
  
  const top100MusicasArray = top100MusicasPorDuracao();

// -----------------------------------------------------------
// ⬆️ FIM DOS CÁLCULOS FINAIS ⬆️
// -----------------------------------------------------------


  // ------------------------
  // Retorno do Hook
  // ------------------------
  return {
  history,
  loading,
  
  // *** VALORES PRONTOS PARA USO ***
  totalMusicasValor,        // Para o card de "Total de reproduções"
  primeiraMusicaValor,      // Para o card de "Primeira música no histórico"
  artistaMaisOuvidoValor,   // Para o card de "Artista mais ouvido"
  top100MusicasArray,       // Para alimentar o carrossel

  // --- FUNÇÕES E MÉTODOS EXISTENTES (NÃO REMOVIDOS) ---
  // Estatísticas gerais
  contarTotalMusicas,
  contarMusicasDiferentes,
  totalMinutosOuvidos,
  mediaTempoDiario,
  horariosMaisOuvidos,
  estacoesMaisOuvidas,
  
  // Top 100
  top100Artistas,
  top100MusicasPorDuracao,
  
  // Estatísticas de artista
  percentualPlaysDoArtista,
  top20MusicasDoArtista,
  posicaoArtistaTop100,
  estacoesDoArtista,
  
  pesquisar
  };
}
