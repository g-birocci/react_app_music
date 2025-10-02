// components/MusicCard.js
import Image from 'next/image';

// Este componente recebe as informações de UMA ÚNICA MÚSICA
export default function MusicCard({ title, artist, coverUrl }) {
  // Use um placeholder se não houver coverUrl no seu JSON
  const finalCoverUrl = coverUrl || "/covers/placeholder-album.jpg";

  return (
    <div className="flex-shrink-0 w-[120px] sm:w-[150px] md:w-[170px] cursor-pointer group">
      {/* Container da Capa (para o efeito hover) */}
      <div className="relative w-full aspect-square rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
        <Image
          src={finalCoverUrl}
          alt={`Capa da música ${title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      
      {/* Detalhes da Música */}
      <div className="mt-2">
        <h3 className="text-base font-semibold text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-500 truncate">{artist}</p>
      </div>
    </div>
  );
}