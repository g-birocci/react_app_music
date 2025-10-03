// components/MusicCard.js
import Image from 'next/image';

// Este componente recebe as informações de UMA ÚNICA MÚSICA
export default function MusicCard({ title, artist, coverUrl }) {
  // Use um placeholder se não houver coverUrl no seu JSON
  const finalCoverUrl = coverUrl || "/covers/placeholder-album.jpg";

  return (
    <div className="flex-shrink-0 w-30 sm:w-[160px] md:w-[180px] cursor-pointer group">
      
      {/* Container da Capa (com efeito hover) */}
      <div className="relative w-full aspect-square rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.03]">
        <Image
          src={finalCoverUrl}
          alt={`Capa da música ${title}`}
          layout="fill"
          objectFit="cover"
          onError={(e) => {
            const img = e?.target;
            if (img && img.src && !img.src.endsWith('/covers/placeholder-album.jpg')) {
              img.src = '/covers/placeholder-album.jpg';
            }
          }}
        />
      </div>
      
      {/* Detalhes da Música */}
      <div className="mt-2 text-left">
        <h3 className="text-sm font-bold text-gray-900 truncate">{title}</h3>
        <p className="text-xs text-gray-300 truncate">{artist}</p>
      </div>
    </div>
  );
}
