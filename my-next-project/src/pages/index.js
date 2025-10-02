// pages/index.js

import { useSpotiHistory } from "@/hooks/useSpotiHistory";
import { Search } from "lucide-react"; 
import Image from "next/image";
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
        <div className="bg-gray-100 min-h-screen"> 
            
            {/* 1. NAV BAR */}
            <nav className="
    fixed top-4 left-1/2 -translate-x-1/2
     backdrop-blur-md
    border border-gray-100
    shadow-lg rounded-2xl
    flex justify-around items-center
    w-[90%] max-w-md py-2 px-2
    text-black
    transition-all
  "
>
                <ul className="flex items-center space-x-4">
                    <li>
                        <Image src="/Fotos/FotoPerfilSara.png" alt="Foto-Perfil" width={60} height={60} className="rounded-full" />
                    </li>
                    <li>
                        <p className="text-sm">Olá, <span className="font-bold">{nome}</span></p>
                    </li>
                    
                    
                </ul>
            </nav>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="space-y-10 py-6 md:py-10 max-w-7xl mx-auto px-4 md:px-0">

                {/* 2. CARROSSEL TOP 100 */}
                <CarouselSection 
                    title="Top 100 Músicas" 
                    data={top100MusicasArray} // ⚠️ CORRIGIDO: Usando o nome correto do array
                />

                {/* 3. SEÇÃO MAIS TOCADAS */}
                <h2 className="text-3xl font-bold mt-8">Mais Tocadas</h2>
                <CadsMusic data={top100MusicasArray} /> 
            </div>

        </div>
    );
}