import { useState } from 'react';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../estadoGlobal/UserContext";
import { useSpotiHistory } from "@/hooks/useSpotiHistory"; //importa as funções com as estatísticas
import { useRouter } from "next/router";

export default function Perfil() {

  const { user } = useContext(UserContext);
  const router = useRouter();
  const [compartilhado, setCompartilhado] = useState(false);

  const {
    loading,
    contarTotalMusicas,
    contarMusicasDiferentes,
    totalMinutosOuvidos,
    mediaTempoDiario,
    horariosMaisOuvidos,
    estacoesMaisOuvidas,
  } = useSpotiHistory();

  function compartilhar() {
    setCompartilhado(true);
    setTimeout(() => setCompartilhado(false), 1000);
  }

  if (loading) return <p className="text-3xl font-bold">A carregar estatísticas...</p>;

  return (
    <div>
      <div className="flex justify-between items-center px-4 pt-2">
        {/* Retorna para a página principal*/}
        <FaArrowLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* Link para editar perfil */}
        <Link href="/editar-perfil">
          <FaCog className="w-6 h-6 cursor-pointer" />
        </Link>
      </div>

      {/* Perfil */}
      <div className="flex flex-col items-center mt-6">
        <img
          src="/Fotos/FotoPerfilSara.png"
          alt="Foto de Perfil"
          className="w-40 h-40 object-cover rounded-full"
        />
        <h2 className="mt-3 text-2xl font-bold">{user.nome}</h2>
        <p className="text-sm opacity-80">{user.pais}</p>
        <button
          onClick={compartilhar}
          className="mt-3 bg-white/30 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-full font-semibold cursor-pointer"
        >
          Compartilhar Perfil
        </button>
        {compartilhado && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/10 text-white px-6 py-3 rounded shadow-md z-50">
            Perfil compartilhado!
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="mt-8">
        <h3 className="text-3xl font-bold text-center mb-6 p-5">Estatísticas da conta</h3>
        <div>
          <ul className="grid grid-cols-2 gap-7 text-center">

            <li className="flex flex-col items-center">
              <strong className="text-2xl font-bold">{contarTotalMusicas()}</strong>
              <span className="text-sm">Total de Plays</span>
            </li>
            <li className="flex flex-col items-center">
              <strong className="text-2xl font-bold">{contarMusicasDiferentes()}</strong>
              <span className="text-sm">Músicas Diferentes</span>
            </li>
            <li className="flex flex-col items-center">
              <strong className="text-2xl font-bold">{totalMinutosOuvidos()}</strong>
              <span className="text-sm">Minutos Totais Ouvidos</span>
            </li>
            <li className="flex flex-col items-center">
              <strong className="text-2xl font-bold">{mediaTempoDiario().toFixed(1)}</strong>
              <span className="text-sm">Média Diária</span>
            </li>
            <li className="flex flex-col items-center">
              <strong className="text-2xl font-bold">{horariosMaisOuvidos().slice(0, 3).join("h, ")}h</strong>
              <span className="text-sm">Horários mais ouvidos</span>
            </li>
            <li className="flex flex-col items-center">
              <strong className="text-2xl font-bold">{estacoesMaisOuvidas()}</strong>
              <span className="text-sm">Estação favorita</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}