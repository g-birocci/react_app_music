import { FaArrowLeft, FaCog } from 'react-icons/fa'

export default function Perfil() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 text-white">

      {/* Cabeçalho */}
      <div className="flex justify-between items-center px-6 pt-10">
        <FaArrowLeft className="w-6 h-6 cursor-pointer" />
        <FaCog className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Perfil */}
      <div className="flex flex-col items-center mt-6">
        <img
          src="/Fotos/FotoPerfilSara.png"
          alt="Foto de Perfil"
          className="w-40 h-40 rounded-full"
        />
        <h2 className="mt-3 text-2xl font-bold">Sara Leite</h2>
        <p className="text-sm opacity-80">
          Portugal
        </p>
        <button className="mt-3 bg-white/30 backdrop-blur-sm text-white px-6 py-2 rounded-full font-semibold cursor-pointer">
          Compartilhar Perfil
        </button>
      </div>

      {/* Estatísticas */}
      <div className="mt-8">
        <h3 className="text-3xl font-bold text-center mb-6 p-1">Estatísticas da conta</h3>
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold">12847</p> {/* Buscar nas funções */}
            <p className="text-sm opacity-80">Total de Plays</p>
          </div>
          <div>
            <p className="text-2xl font-bold">1500</p>  {/* Buscar nas funções */}
            <p className="text-sm opacity-80">Músicas ouvidas</p>
          </div>
          <div>
            <p className="text-2xl font-bold">3445</p>  {/* Buscar nas funções */}
            <p className="text-sm opacity-80">Média diária</p>
          </div>
          <div>
            <p className="text-2xl font-bold">127 min</p>  {/* Buscar nas funções */}
            <p className="text-sm opacity-80">Músicas únicas</p>
          </div>
          <div>
            <p className="text-2xl font-bold">54912</p>  {/* Buscar nas funções */}
            <p className="text-sm opacity-80">Minutos totais ouvidos</p>
          </div>
          <div>
            <p className="text-2xl font-bold">60</p>  {/* Buscar nas funções */}
            <p className="text-sm opacity-80">Playlists</p>
          </div>
          <div>
            <p className="text-2xl font-bold">18h00</p>  {/* Buscar nas funções */}
            <p className="text-sm opacity-80">Horário Favorito</p>
          </div>
          <div>
            <p className="text-2xl font-bold">Verão</p>  {/* Buscar nas funções */}
            <p className="text-sm opacity-80">Estação do Ano Favorita</p>
          </div>
        </div>
      </div>
    </div>
  );
}