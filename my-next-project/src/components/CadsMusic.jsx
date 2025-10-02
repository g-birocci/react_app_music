// components/CadsMusic.js

// ⚠️ Importando o componente que acabamos de criar!
import MusicCard from "@/components/MusicCard"; 


export default function CadsMusic({ data }) {
    
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className="text-center text-gray-500 p-4">
                Nenhum dado de música disponível para esta seção.
            </div>
        );
    }

    return (
        // Container do Carrossel com scroll horizontal
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 px-1">
            
            {/* O .map() cria AUTOMATICAMENTE os cards */}
            {data.map((item, index) => (
                <MusicCard
                    key={`${item.musica}-${index}`}
                    title={item.musica}        // Nome da Música
                    artist={item.artista}      // Nome do Artista
                    // coverUrl opcional (passado se você tiver a lógica da capa)
                />
            ))}
            
        </div>
    );
}