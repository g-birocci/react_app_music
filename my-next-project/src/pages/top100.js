import { useState } from "react";
import { useRouter } from "next/router";
import { ChevronLeft, Filter, Play, Share2 } from "lucide-react"; // se preferir react-icons, vê nota abaixo

// botões (Músicas | Artistas)
function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-2 rounded-full text-sm border transition ${
        active
          ? "bg-white text-slate-900 border-white shadow-sm"
          : "bg-white/10 text-white border-white/40 hover:bg-white/20"
      }`}
    >
      {children}
    </button>
  );
}

// item da lista
function Row({ index, label }) {
  return (
    <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white/90 hover:bg-white transition text-slate-900">
      <span className="text-xs font-medium tracking-wider mr-3">#{index}</span>
      <span className="flex-1 text-left text-sm">{label}</span>
      <Play size={16} className="opacity-40" />
    </button>
  );
}

export default function Top100Page() {
  const router = useRouter();
  const [tab, setTab] = useState("songs"); // "songs" | "artists"

  // dados MOCK só para UI (substitui quando tiveres API real)
  const songs = Array.from({ length: 100 }, (_, i) => `Música ${i + 1}`);
  const artists = Array.from({ length: 100 }, (_, i) => `Artista ${i + 1}`);
  const list = tab === "songs" ? songs : artists;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 text-white">
      <div className="max-w-[420px] mx-auto pb-24">
        {/*top100/Quadrado */}
        <div className="pt-0">
          <div className="mx-auto w-fit rounded-xl bg-white/90 text-slate-900 px-4 py-2 font-semibold shadow">
            TOP #100
          </div>
        </div>

        {/* linha: voltar | tabs | filtro */}
        <div className="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 justify-self-start"
            aria-label="Voltar"
          >
            <ChevronLeft />
          </button>

          <div className="justify-self-center flex gap-2">
            <Chip active={tab === "songs"} onClick={() => setTab("songs")}>
              Músicas
            </Chip>
            <Chip active={tab === "artists"} onClick={() => setTab("artists")}>
              Artistas
            </Chip>
          </div>

          <button
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 justify-self-end"
            aria-label="Filtros"
          >
            <Filter />
          </button>
        </div>

        {/* botões play/Compartilhar */}
        <div className="mt-2 flex justify-center gap-2 px-4">
          <button className="px-3 py-1 rounded-full text-xs bg-white text-black flex items-center gap-2">
            <Play size={14} /> Play
          </button>
          <button className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/30 hover:bg-white/20 flex items-center gap-2">
            <Share2 size={14} /> Compartilhar
          </button>
        </div>

        {/* lista */}
        <div className="p-4 grid gap-3">
          {list.map((label, i) => (
            <Row key={i} index={i + 1} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
}
