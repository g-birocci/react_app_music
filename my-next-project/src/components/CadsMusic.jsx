// components/CadsMusic.js
import MusicCard from "@/components/MusicCard";

// Normaliza texto para um slug de arquivo (ex.: "Álbum Top" -> "album-top")
function toSlug(texto) {
  return (texto || "")
    .toString()
    .normalize("NFD").replace(/\p{Diacritic}+/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CadsMusic({ data, isTop100 = false }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        Nenhum dado de música disponível para esta seção.
      </div>
    );
  }

  // Gera uma capa SVG genérica baseada no título/álbum (data URI)
  function generateGenericCover(title) {
    const base = (title || "").toString();
    let hash = 0;
    for (let i = 0; i < base.length; i++) {
      hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
    }
    const palettes = [
      ["#FF7A7A", "#FFD1D1"],
      ["#7ACBFF", "#D1EEFF"],
      ["#7AFFC1", "#D1FFE9"],
      ["#F7B267", "#FAD8A6"],
      ["#CFA2FF", "#EAD6FF"],
      ["#6EE7B7", "#A7F3D0"],
      ["#FCA5A5", "#FECACA"],
      ["#93C5FD", "#BFDBFE"],
      ["#FDE68A", "#FEF3C7"],
      ["#A78BFA", "#DDD6FE"],
    ];
    const idx = hash % palettes.length;
    const [c1, c2] = palettes[idx];
    const initials = base
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase() || "")
      .join("");
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" fill="url(#g)"/>
  <circle cx="80" cy="20" r="8" fill="rgba(255,255,255,0.35)"/>
  <circle cx="18" cy="82" r="6" fill="rgba(255,255,255,0.25)"/>
  <text x="50" y="58" text-anchor="middle" font-size="34" font-family="Arial, Helvetica, sans-serif" fill="rgba(0,0,0,0.55)" font-weight="700">${initials}</text>
  <text x="50" y="76" text-anchor="middle" font-size="8" font-family="Arial, Helvetica, sans-serif" fill="rgba(0,0,0,0.45)">${base.substring(0, 18)}</text>
  <rect x="6" y="6" width="88" height="88" rx="10" ry="10" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
  <rect x="3" y="3" width="94" height="94" rx="12" ry="12" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="1"/>
</svg>`;
    const encoded = encodeURIComponent(svg)
      .replace(/%20/g, " ")
      .replace(/%0A/g, "")
      .replace(/%3D/g, "=")
      .replace(/%3A/g, ":");
    return `data:image/svg+xml;utf8,${encoded}`;
  }

  return (
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 px-1">
      {data.map((item, index) => (
        <MusicCard
          key={`${item.musica}-${index}`}
          title={item.musica}
          artist={item.artista}
          coverUrl={isTop100 ? generateGenericCover(item.album || item.musica) : undefined}
        />
      ))}
    </div>
  );
}
