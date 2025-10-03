import { useEffect, useState, useMemo } from "react";
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
  const { top100Artistas, top100MusicasPorDuracao, loading } = useSpotiHistory();
  const [compartilhado, setCompartilhado] = useState(false);
  const [aTocar, setATocar] = useState(false);

  const [period, setPeriod] = useState("all");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setVisible(10);
  }, [tab, period]);

  function compartilhar() {
    setCompartilhado(true);
    setTimeout(() => setCompartilhado(false), 1500);
  }

  function play() {
    setATocar(true);
    setTimeout(() => setATocar(false), 1500);
  }

  const songs = useMemo(() => {
    if (loading) return [];
    return top100MusicasPorDuracao(period);
  }, [top100MusicasPorDuracao, loading, period]);

  const artists = useMemo(() => {
    if (loading) return [];
    return top100Artistas(period);
  }, [top100Artistas, loading, period]);

  const list = tab === "songs" ? songs : artists;
  const items = list.slice(0, visible);
  const hasMore = visible < list.length;

  if (loading) {
    return (
      <div className="max-w-[420px] mx-auto text-3xl font-bold text-center py-10">
        A carregar seu Top 100...
      </div>
    );
  }

  const loadMore = () => setVisible(v => Math.min(v + 10, list.length));

  return (
    <div>
      <div className="max-w-[420px] mx-auto pb-7">
        <div className="sticky top-0 z-26 pointer-events-none">
          <div className="h-2 bg-gradient-to-b from-cyan-400/60 to-transparent" />
          <div className="px-2 pb-2">
            <div className="pointer-events-auto mx-auto w-full rounded-2xl backdrop-blur-xl bg-white/10 ring-1 ring-white/20 shadow-lg">
              <div className="pt-[max(env(safe-area-inset-top),0.5rem)]">
                <div className="mx-auto w-fit rounded-full bg-white/90 text-slate-900 px-3 py-1 text-4xl font-semibold shadow">
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

                <div className="relative">
                  <button
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer"
                    onClick={() => setShowMenu(prev => !prev)}
                    aria-label="Filtros"
                  >
                    <Filter />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded shadow-lg text-black text-sm z-50">
                      <button onClick={() => { setPeriod("4weeks"); setShowMenu(false); }} className="block w-full px-4 py-2 text-left hover:bg-cyan-400/60 cursor-pointer">4 semanas</button>
                      <button onClick={() => { setPeriod("6months"); setShowMenu(false); }} className="block w-full px-4 py-2 text-left hover:bg-cyan-400/60 cursor-pointer">6 meses</button>
                      <button onClick={() => { setPeriod("1year"); setShowMenu(false); }} className="block w-full px-4 py-2 text-left hover:bg-cyan-400/60 cursor-pointer">Último ano</button>
                      <button onClick={() => { setPeriod("all"); setShowMenu(false); }} className="block w-full px-4 py-2 text-left hover:bg-cyan-400/60 cursor-pointer">Sempre</button>
                    </div>
                  )}
                </div>
              </div>

              {/* ações */}
              <div className="justify-self-center flex gap-2 px-4 pb-3">
                <button
                  onClick={play}
                  className="flex items-center mt-3 bg-white/30 backdrop-blur-sm text-white text-xs px-3 py-3 gap-2 rounded-full font-semibold cursor-pointer"
                >
                  <Play size={14} /> Play
                </button>
                {/* Pop-up Play */}
                {aTocar && (
                  <div className="absolute top-full mt-2 bg-white/10 text-white px-6 py-2 rounded shadow-md">
                    Playlist a tocar!
                  </div>
                )}
                <button
                  onClick={compartilhar}
                  className="flex items-center mt-3 bg-white/30 backdrop-blur-sm text-white text-xs px-3 py-3 gap-2 rounded-full font-semibold cursor-pointer"
                >
                  <Share2 size={14} /> Compartilhar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LISTA */}
        <div className="p-4 grid gap-3">
        {items.map((item, i) => (
          tab === "songs" ? (
            <Row
              key={i}
              index={i + 1}
              songs={[item.musica || 'Música desconhecida', item.artista || 'Artista desconhecido', item.ms_played]}
              artists=""
              tab={tab}
            />
          ) : (
            <Row
              key={i}
              index={i + 1}
              songs=""
              artists={`${item.artista || 'Artista desconhecido'} (${item.plays} plays)`}
              tab={tab}
            />
          )
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
  );
}
