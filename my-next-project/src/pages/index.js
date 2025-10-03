// pages/index.js

import { useSpotiHistory } from "@/hooks/useSpotiHistory";
import { Search } from "lucide-react"; 
import Navbar from "@/components/Navbar";
import CadsMusic from "@/components/CadsMusic"; 


// -----------------------------------------------------------
// Componente Auxiliar: Carrossel (Seção de Música)
// -----------------------------------------------------------
const CarouselSection = ({ title, data }) => {
    if (!data || data.length === 0) return null;
    
    // O CadsMusic é o container que faz o loop com o MusicCard
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 ml-4 md:ml-0">{title}</h2>
            
            <CadsMusic data={data} /> 
        </section>
    );
};


// -----------------------------------------------------------
// Componente Principal: HOME
// -----------------------------------------------------------
export default function Home() {
    // Desestruturando os NOVOS NOMES de variáveis do hook
    const { 
        loading, 
        totalMusicasValor, 
        primeiraMusicaValor, 
        artistaMaisOuvidoValor,
        top100MusicasArray, // Array para os carrosséis
        pesquisar 
    } = useSpotiHistory(); 

    const nome = "Sarah";
    
    const handleSearchClick = () => {
        const resultado = pesquisar("termo de exemplo");
        console.log("Resultado da Pesquisa:", resultado);
    };

    // ⚠️ CORREÇÃO APLICADA AQUI:
    // Usando os valores retornados pelo hook (com sufixo 'Valor') para o fallback
    const total = totalMusicasValor || '...';
    const primeira = primeiraMusicaValor || 'Carregando...';
    const artista = artistaMaisOuvidoValor || 'Carregando...';

    if (loading) {
        return <div className="text-center p-10 text-xl text-gray-600">Carregando dados musicais...</div>;
    }


    return (
        <div className="relative"> 
            
            {/* 1. NAV BAR */}
    <Navbar name={nome}/>
            {/* CONTEÚDO PRINCIPAL */}
            <div className="space-y-10 pt-25 md:py-10 max-w-7xl mx-auto px-4 md:px-0">

                {/* 2. CARROSSEL TOP 100 */}
                <CarouselSection 
                    title="Top 100 Músicas" 
                    data={top100MusicasArray} // ⚠️ CORRIGIDO: Usando o nome correto do array
                />

                {/* 3. SEÇÃO MAIS TOCADAS */}
                <h2 className="text-3xl color to-black font-bold mt-8">Mais Tocadas</h2>
                <CadsMusic data={top100MusicasArray} /> 
            </div>

        </div>
    );
}