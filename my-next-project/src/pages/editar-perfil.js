import { FaArrowLeft } from "react-icons/fa";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../estadoGlobal/UserContext";
import Image from 'next/image';

export default function EditarPerfil() {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();
    const [nome, setNome] = useState(user.nome);
    const [pais, setPais] = useState(user.pais);
    const salvarAlteracoes = (e) => {
        e.preventDefault();
        setUser({ nome, pais });
        alert("Perfil atualizado!");
        router.push("/perfil"); //redireciona para a página do perfil
    };

    function cancelar() {
        router.push("/perfil");
    }
    return (
        <div className="flex flex-col items-center">
            <div className="w-full flex items-center mt-6">
                <FaArrowLeft
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => router.push("/perfil")}
                />
            </div>

            <div className="flex flex-col items-center mt-8">
                <Image
                    src="/Fotos/FotoPerfilSara.png"
                    alt="Foto-Perfil"
                    width={160}
                    height={160}
                    className="w-20 h-20 rounded-full"
                />
                <h2 className="mt-4 text-2xl font-light">Editar Perfil</h2>
            </div>
            <form
                onSubmit={salvarAlteracoes}
                className="flex flex-col items-left mt-8 w-full max-w-sm gap-4"
            >
                <label className="text-md font-semibold">Nome:</label>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    onFocus={() => setNome("")}
                    className="flex-1 px-5 py-3 bg-white/30 text-white rounded-full font-semibold hover:bg-white/40 transition"
                />
                <label className="text-md font-semibold">País:</label>
                <input
                    type="text"
                    placeholder="País"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    onFocus={() => setPais("")}
                    className="flex-1 px-5 py-3 bg-white/30 text-white rounded-full font-semibold hover:bg-white/40 transition"
                />

                <div className="flex gap-4 mt-6">
                    <button
                        type="button"
                        onClick={cancelar}
                        className="flex-1 px-2 py-2 bg-white/30 text-white rounded-full font-semibold cursor-pointer hover:bg-white/40 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-2 py-2 bg-green-500 text-white rounded-full font-semibold cursor-pointer hover:bg-green-600 transition"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}