import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";
import { useSpotiHistory } from "@/hooks/useSpotiHistory";

// UI – card de música
function SongRow({ index, title }) {
  return (
    <div className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/70 hover:bg-white/80 transition text-slate-900 shadow">
      <span className="text-xs font-semibold mr-3">#{index}</span>
      <span className="flex-1 text-left text-sm truncate">{title}</span>
    </div>
  );
}

// UI – skeleton enquanto carrega
function SongRowSkeleton() {
  return (
    <div className="w-full px-4 py-3 rounded-2xl bg-white/50 shadow overflow-hidden">
      <div className="animate-pulse flex items-center gap-3">
        <div className="h-3 w-8 rounded bg-white/60" />
        <div className="h-3 flex-1 rounded bg-white/60" />
      </div>
    </div>
  );
}


const normalize = (s = "") =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

export default function Top20ArtistaPage() {
  const router = useRouter();
  const { slug } = router.query;                 
  const period = "all";
  const [visible, setVisible] = useState(10);

  const { loading, history, top20MusicasDoArtista } = useSpotiHistory();

  useEffect(() => setVisible(10), [slug]);

  // resolve o nome real do artista a partir do slug
  const artistName = useMemo(() => {
    if (!slug || !Array.isArray(history)) return "";
    const candidate = normalize(decodeURIComponent(String(slug)).replace(/-/g, " "));
    const artistas = Array.from(
      new Set(history.map(m => m.master_metadata_album_artist_name).filter(Boolean))
    );
    const exact = artistas.find(a => normalize(a) === candidate);
    if (exact) return exact;
    const starts = artistas.find(a => normalize(a).startsWith(candidate));
    if (starts) return starts;
    const contains = artistas.find(a => normalize(a).includes(candidate));
    return contains || "";
  }, [slug, history]);

  const songs = useMemo(() => {
    if (loading || !artistName) return [];
    return top20MusicasDoArtista(artistName, period) || [];
  }, [loading, artistName, period, top20MusicasDoArtista]);

  const items = songs.slice(0, visible);
  const hasMore = visible < songs.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 text-white">
      <div className="max-w-[420px] mx-auto px-4 pb-24">
        {/* topo com back */}
        <div className="pt-3 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
            aria-label="Voltar"
          >
            <ChevronLeft />
          </button>
        </div>

        {/* badge Top#20 */}
        <div className="mt-6 flex justify-center">
          <div className="px-10 py-4 rounded-full bg-white/85 text-slate-900 font-semibold shadow text-sm">
            Top# 20
          </div>
        </div>

        {/* título opcional */}
        {artistName && (
          <h1 className="mt-3 text-center text-sm opacity-90">{artistName}</h1>
        )}

        {/* LISTA */}
        <div className="mt-5 grid gap-4">
          {/* SKELETON – apenas com o carregamento do hook */}
          {loading && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <SongRowSkeleton key={i} />
              ))}
              <div className="mt-6 flex justify-center">
                <div className="px-6 py-2 rounded-2xl bg-white/70 text-slate-900 text-sm shadow opacity-70">
                  A carregar…
                </div>
              </div>
            </>
          )}

          {/* Dados reais (aparecem quando loading = false) */}
          {!loading &&
            items.map((m, i) => (
              <SongRow key={`${m.musica}-${i}`} index={i + 1} title={m.musica ?? "—"} />
            ))}

          {!loading && items.length === 0 && (
            <div className="text-center opacity-90">Não há músicas para mostrar.</div>
          )}
        </div>

        {/* Botão Ver mais (+10) */}
        {!loading && hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisible(v => Math.min(v + 10, songs.length))}
              className="px-6 py-2 rounded-2xl bg-white/85 text-slate-900 font-semibold shadow text-sm hover:bg-white"
            >
              Ver mais
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
