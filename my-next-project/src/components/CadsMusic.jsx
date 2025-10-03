import { useRef, useState, useEffect } from "react";
import MusicCard from "@/components/MusicCard";

export default function CadsMusic({ data, isTop100 = false }) {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const momentumRef = useRef(null);

  // Função para gerar capa genérica
  const generateGenericCover = (title) => {
    const base = (title || "").toString();
    const hash = base.split("").reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0);
    const palettes = [
      ["#FF7A7A", "#FFD1D1"], ["#7ACBFF", "#D1EEFF"], ["#7AFFC1", "#D1FFE9"],
      ["#F7B267", "#FAD8A6"], ["#CFA2FF", "#EAD6FF"], ["#6EE7B7", "#A7F3D0"],
      ["#FCA5A5", "#FECACA"], ["#93C5FD", "#BFDBFE"], ["#FDE68A", "#FEF3C7"], ["#A78BFA", "#DDD6FE"],
    ];
    const [c1, c2] = palettes[hash % palettes.length];
    const initials = base
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase() || "")
      .join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient></defs>
      <rect width="100" height="100" fill="url(#g)"/>
      <text x="50" y="58" text-anchor="middle" font-size="34" font-family="Arial" fill="rgba(0,0,0,0.55)" font-weight="700">${initials}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // Inicia o drag
  const onDragStart = (x) => {
    setIsDragging(true);
    setStartX(x - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
  };

  const onDragMove = (x) => {
    if (!isDragging) return;
    const walk = x - startX;
    const newScroll = scrollLeft - walk;
    const delta = newScroll - carouselRef.current.scrollLeft;
    setVelocity(delta);
    carouselRef.current.scrollLeft = newScroll;
  };

  const onDragEnd = () => {
    setIsDragging(false);
    const decay = () => {
      if (Math.abs(velocity) < 0.5) return;
      carouselRef.current.scrollLeft += velocity;
      setVelocity(prev => prev * 0.95); // fricção
      momentumRef.current = requestAnimationFrame(decay);
    };
    decay();
  };

  // Eventos mouse
  const handleMouseDown = (e) => onDragStart(e.pageX);
  const handleMouseMove = (e) => onDragMove(e.pageX);
  const handleMouseUp = () => onDragEnd();

  // Eventos touch
  const handleTouchStart = (e) => onDragStart(e.touches[0].pageX);
  const handleTouchMove = (e) => onDragMove(e.touches[0].pageX);
  const handleTouchEnd = () => onDragEnd();

  // Scroll com setas do teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (!carouselRef.current) return;
      const step = carouselRef.current.offsetWidth * 0.3;
      if (e.key === "ArrowRight") {
        carouselRef.current.scrollBy({ left: step, behavior: "smooth" });
      } else if (e.key === "ArrowLeft") {
        carouselRef.current.scrollBy({ left: -step, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="text-center text-gray-500 p-4">Nenhum dado de música disponível.</div>;
  }

  return (
    <div
      ref={carouselRef}
      className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-1 cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {data.map((item, index) => (
        <MusicCard
          key={`${item.musica}-${index}`}
          title={item.musica}
          artist={item.artista}
          coverUrl={isTop100 ? generateGenericCover(item.album || item.musica) : item.coverUrl}
        />
      ))}
    </div>
  );
}