import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChevronLeft, Filter, Play, Share2 } from "lucide-react";
import { useSpotiHistory } from "@/hooks/useSpotiHistory";

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

function Row({ index, songs, artists, tab }) {
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white/90 hover:bg-white transition text-slate-900">
      <span className="text-xs font-medium tracking-wider mr-3">#{index}</span>
      <span className="flex-1 text-left text-sm">{ tab === 'songs' ? 
        <span>
      <span className="truncate">{songs[0]}</span> - {(formatTime(songs[2]))}
          <p className="text-xs text-neutral-500">Song by {songs[1]}</p>
        </span> : `${artists}` }</span>
      <Play size={16} className="text-neutral-400" />
    </button>
  );
}

export default function Top100Page() {
  const router = useRouter();
  const [tab, setTab] = useState("songs");
  const [visible, setVisible] = useState(10);
  const { top100Artistas, top100MusicasPorDuracao } = useSpotiHistory();
  
  // MOCK
  const artists = top100Artistas().map(m => m.artista);
  const songs = top100MusicasPorDuracao().map(m => [m.musica, m.artista, m.ms_played]);
  const list = tab === "songs" ? songs : artists;
  const items = list.slice(0, visible);
  const hasMore = visible < list.length;

  useEffect(() => {
    setVisible(10);
  }, [tab]);

  const loadMore = () => setVisible(v => Math.min(v + 10, list.length));

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 text-white">
      <div className="max-w-[420px] mx-auto pb-24">

        
        <div className="sticky top-0 z-26 pointer-events-none">
        
          <div className="h-2 bg-gradient-to-b from-cyan-400/60 to-transparent" />
          <div className="px-2 pb-2">
            <div
              className="
                pointer-events-auto
                mx-auto w-full
                rounded-2xl
                backdrop-blur-xl bg-white/10
                ring-1 ring-white/20
                shadow-lg
              "
            >
              
              <div className="pt-[env(safe-area-inset-top)] pt-2">
                <div className="mx-auto w-fit rounded-full bg-white/90 text-slate-900 px-3 py-1 text-sm font-semibold shadow">
                  TOP #100
                </div>
              </div>

              {/* voltar | tabs | filtro */}
              <div className="mt-2 grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2">
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
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
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
                  aria-label="Filtros"
                >
                  <Filter />
                </button>
              </div>

              {/* ações */}
              <div className="flex justify-center gap-2 px-4 pb-3">
                <button className="px-3 py-1 rounded-full text-xs bg-white text-black flex items-center gap-2 shadow-sm">
                  <Play size={14} /> Play
                </button>
                <button className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/30 hover:bg-white/20 flex items-center gap-2">
                  <Share2 size={14} /> Compartilhar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LISTA */}
        <div className="p-4 grid gap-3">
          {items.map((label, i) => (
            <Row key={i} index={i + 1} artists={label} songs={label} tab={tab} />
          ))}

          {hasMore ? (
            <button
              onClick={loadMore}
              className="mt-2 mx-auto px-4 py-2 rounded-full text-sm bg-white text-slate-900 hover:opacity-90 shadow"
            >
              Ver mais
            </button>
          ) : (
            <div className="text-center text-xs opacity-80 py-3">
              Chegaste ao fim do TOP 100
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
