import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";

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
          <div className="ml-3 text-xs opacity-90 tracking-wide">
            INFORMAÇÃO ARTISTA
          </div>
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

          <h1 className="mt-4 text-3xl font-semibold text-center drop-shadow">
            Eminem
          </h1>

          {/* badge Top#20 */}
          <div className="mt-3 flex justify-center">
            <div className="px-6 py-2 rounded-full bg-white/85 text-slate-900 font-semibold shadow text-sm">
              Top# 20
            </div>
          </div>

          {/* métricas */}
          <div className="mt-8 space-y-5">
            <Metric label="#1" desc="Posição deste artista no teu Top 100" />
            <Metric label="9903" desc="Vezes que ouviste este artista" />
            <Metric
              label="Outono"
              desc="Estação do ano em que mais ouves a música deste artista"
            />
            <Metric
              label="8%"
              desc="Porcentagem deste artista na tua playlist"
            />
            <Metric
              label="130"
              desc="Número de músicas diferentes que já ouviste deste artista"
            />
            <Metric
              label="23912"
              desc="Total de minutos que passaste a ouvir"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
