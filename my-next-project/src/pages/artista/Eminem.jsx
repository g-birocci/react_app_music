// src/pages/artista/eminem.jsx  (recomendo deixar o nome do ficheiro em minúsculas)
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";
import { useSpotiHistory } from "@/hooks/useSpotiHistory";

// Componente para cada métrica
function Metric({ label, desc }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-base font-bold text-white drop-shadow">{label}</div>
      <div className="mt-2 rounded-2xl bg-white/90 text-slate-900 px-4 py-3 text-sm leading-relaxed shadow w-full">
        {desc}
      </div>
    </div>
  );
}

export default function EminemPage() {
  const router = useRouter();

  const {
    loading,
    posicaoArtistaTop100,
    percentualPlaysDoArtista,
    estacoesDoArtista,
    totalMinutosOuvidos,
    top20MusicasDoArtista,
  } = useSpotiHistory();

  const nome = "Eminem";
  const period = "all"; // "4weeks" | "6months" | "1year" | "all"

  if (loading) return <div className="text-white text-center mt-10">Carregando…</div>;

  const posicao = posicaoArtistaTop100(nome, period) ?? "—";
  const percent = percentualPlaysDoArtista(nome, period).toFixed(1);
  const estacao = estacoesDoArtista(nome, period)[0] ?? "—";
  const minutos = totalMinutosOuvidos(period);
  const musicasDif = top20MusicasDoArtista(nome, period).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 text-white">
      <div className="max-w-[420px] mx-auto pb-24 px-4">
        {/* topo */}
        <div className="pt-3 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft />
          </button>
          <div className="ml-3 text-xs opacity-90 tracking-wide">INFORMAÇÃO ARTISTA</div>
        </div>

        {/* card do artista */}
        <div className="mt-5">
          <div className="mx-auto w-full">
            <img
              src="/Fotos/FotoEminem.png"
              alt="Eminem"
              className="w-full h-[320px] object-cover rounded-2xl shadow"
            />
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-center drop-shadow">{nome}</h1>

          {/* badge Top# */}
          <div className="mt-3 flex justify-center">
            <div className="px-6 py-2 rounded-full bg-white/85 text-slate-900 font-semibold shadow text-sm">
              Top# {posicao}
            </div>
          </div>

          {/* métricas */}
          <div className="mt-8 space-y-5">
            <Metric label={`#${posicao}`} desc="Posição deste artista no teu Top 100" />
            <Metric label={`${percent}%`} desc="Porcentagem deste artista na tua playlist" />
            <Metric label={estacao} desc="Estação do ano em que mais ouves a música deste artista" />
            <Metric label={musicasDif} desc="Número de músicas diferentes que já ouviste deste artista" />
            <Metric label={minutos} desc="Total de minutos que passaste a ouvir este artista" />
          </div>
        </div>
      </div>
    </div>
  );
}
