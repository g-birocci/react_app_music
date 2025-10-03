import { useState, useEffect } from "react";
import { useSpotiHistory } from "@/hooks/useSpotiHistory";
import SearchInput from "@/components/SearchInput";
import SearchResults from "@/components/SearchResult";
import Navbar from "@/components/Navbar";

export default function Pesquisa() {
  const { loading, pesquisar } = useSpotiHistory();
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState({
    musicas: [],
    albuns: [],
    artistas: [],
  });
  const [carregandoPesquisa, setCarregandoPesquisa] = useState(false);

  // Debounce + safe async
  useEffect(() => {
    let cancelado = false;
    const q = termo.trim();

    if (!q) {
      setResultados({ musicas: [], albuns: [], artistas: [] });
      setCarregandoPesquisa(false);
      return;
    }

    setCarregandoPesquisa(true);
    const t = setTimeout(async () => {
      try {
        const res = await Promise.resolve(pesquisar(q)); // suporta sync/async
        if (!cancelado) setResultados(res ?? { musicas: [], albuns: [], artistas: [] });
      } finally {
        if (!cancelado) setCarregandoPesquisa(false);
      }
    }, 250); 

    return () => {
      cancelado = true;
      clearTimeout(t);
    };
   
  }, [termo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-300 ">
        <p className="max-w-[520px] w-full text-center text-white/95 text-xl font-semibold drop-shadow">
          A carregar histórico...
        </p>
      </div>
    );
  }

  const { musicas, albuns, artistas } = resultados;
  const hasQuery = termo.trim().length > 0;
  const empty = hasQuery && musicas.length === 0 && albuns.length === 0 && artistas.length === 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-cyan-6000 ">
        <div className="max-w-[520px] mx-auto px-8 pt-80 pb-28">
          {/* Hero */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full animate-bounce" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 drop-shadow-sm">
              Explore suas músicas favoritas!
            </h1>
            <p className="text-slate-700/90 mt-2">
              Pesquise músicas, álbuns ou artistas e descubra o que você mais gosta 🎵
            </p>
          </div>

          {/* Barra de pesquisa */}
          <div className="mb-5">
            <SearchInput termo={termo} setTermo={setTermo} />
          </div>

          {/* Estado vazio / carregando / resultados */}
          {!hasQuery ? (
            <p className="text-center text-base text-white/90 mt-10">
              Comece a digitar algo na barra de pesquisa acima ✨
            </p>
          ) : carregandoPesquisa ? (
            <p className="text-center text-lg text-white/90 py-12">Carregando resultados...</p>
          ) : empty ? (
            <p className="text-center text-lg text-white/90 py-12">Nenhum resultado encontrado 😢</p>
          ) : (
            // Cartão largo envolvendo o SearchResults (como na 2ª imagem)
            <div className="rounded-2xl bg-white/95 shadow-xl p-4 text-slate-900">           <div className="[&_*]:max-w-full">
                <SearchResults
                  musicas={musicas}
                  albuns={albuns}
                  artistas={artistas}
                  termo={termo}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
