import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { ChevronLeft, Filter, Play, Share2 } from "lucide-react";
import { useSpotiHistory } from "@/hooks/useSpotiHistory";

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-2 rounded-full text-sm border transition ${active
        ? "bg-white text-slate-900 border-white shadow-sm"
        : "bg-white/10 text-white border-white/40 hover:bg-white/20"
        }`}
    >
      {children}
    </button>
  );
}

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
  const [tab, setTab] = useState("songs");
  const [visible, setVisible] = useState(10);
  const { top100Artistas, top100MusicasPorDuracao } = useSpotiHistory();
  const [compartilhado, setCompartilhado] = useState(false);

  useEffect(() => {
    setVisible(10);
  }, [tab]);

  function compartilhar() {
    setCompartilhado(true);
    setTimeout(() => setCompartilhado(false), 1500);
  }

  const songs = useMemo(() => top100MusicasPorDuracao() || [], [top100MusicasPorDuracao]);
  const artists = useMemo(() => top100Artistas() || [], [top100Artistas]);
  const list = tab === "songs" ? songs : artists;

  const items = list.slice(0, visible);
  const hasMore = visible < list.length;

  if (!songs.length && !artists.length) {
    return <div className="text-3xl font-bold">Carregando seu Top 100...</div>
  }

  const loadMore = () => setVisible(v => Math.min(v + 10, list.length));

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 text-white">
      <div className="max-w-[420px] mx-auto pb-2">


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

                <button
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
                  aria-label="Filtros"
                >
                  <Filter />
                </button>
              </div>

              {/* ações */}
              <div className="justify-self-center flex gap-2 px-4 pb-3">
                <button className="flex items-center mt-3 bg-white/30 backdrop-blur-sm text-white text-xs px-3 py-3 gap-2 rounded-full font-semibold cursor-pointer"
>
                  <Play size={14} /> Play
                </button>

                <button
                  onClick={compartilhar}
                  className="flex items-center mt-3 bg-white/30 backdrop-blur-sm text-white text-xs px-3 py-3 gap-2 rounded-full font-semibold cursor-pointer"
                >
                  <Share2 size={14} /> Compartilhar
                </button>
                {compartilhado && (
                  <div className="absolute top-full mt-2 bg-white/10 text-white px-6 py-2 rounded shadow-md">
                    Playlist compartilhada!
                  </div>
                )}
              </div>

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
              label={`${item.musica} — ${item.artista}`}
            />
          ) : (
            <Row
              key={i}
              index={i + 1}
              label={`${item.artista} (${item.plays} plays)`}
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