// pages/index.js
import { useSpotiHistory } from "@/hooks/useSpotiHistory";
import Image from "next/image";
import CadsMusic from "@/components/CadsMusic";
import Link from "next/link";

// -----------------------------------------------------------
// Componente Auxiliar: Carrossel (Seção de Música)
// -----------------------------------------------------------
const CarouselSection = ({ title, data, className, isTop100 = false }) => {
    if (!data || data.length === 0) return null;

    // O CadsMusic é o container que faz o loop com o MusicCard
    return (
        <section className="space-y-4">
            <h2 className={className}>{title}</h2>
            <CadsMusic data={data} isTop100={isTop100} />
        </section>
    );
};

// -----------------------------------------------------------
// Componente Principal: HOME
// -----------------------------------------------------------
export default function Home() {
    // Desestruturando os valores do hook
    const {
        loading,
        totalMusicasValor,
        primeiraMusicaValor,
        artistaMaisOuvidoValor,
        top100MusicasArray, // Array para os carrosséis
        pesquisar
    } = useSpotiHistory();

    const nome = "Sara";

    const handleSearchClick = () => {
        const resultado = pesquisar("termo de exemplo");
        console.log("Resultado da Pesquisa:", resultado);
    };

    // Valores fallback
    const total = totalMusicasValor || '...';
    const primeira = primeiraMusicaValor || 'A carregar...';
    const artista = artistaMaisOuvidoValor || 'A carregar...';

    if (loading) {
        return (
            <div className="max-w-[420px] mx-auto text-3xl font-bold text-center py-10">
                A carregar dados musicais...
            </div>
        );
    }

    return (
        <div>
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
            ">
                <ul className="flex items-center space-x-4">
                    <li>
                        <Link href="/perfil">
                            <Image
                                src="/Fotos/FotoPerfilSara.png"
                                alt="Foto-Perfil"
                                width={80}
                                height={80}
                                className="w-20 h-20 object-cover rounded-full cursor-pointer"
                            />
                        </Link>
                    </li>
                    <li>
                        <p className="text-white text-md">
                            Olá, <span className="text-white font-bold text-2xl">{nome}!</span>
                        </p>
                    </li>
                </ul>
            </nav>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="space-y-10 py-6 md:py-10 max-w-7xl mx-auto px-4 md:px-0 mt-15">

                {/* 2. CARROSSEL TOP 100 */}
                <CarouselSection
                    title="Top 100 Músicas"
                    data={top100MusicasArray}
                    className="text-3xl text-black font-bold mt-8"
                    isTop100
                />

                {/* 3. SEÇÃO MAIS TOCADAS */}
                <h2 className="text-3xl text-black font-bold mt-8">Ouvir novamente...</h2>
                <CadsMusic data={top100MusicasArray} isTop100 />
            </div>
        </div>
    );
}
