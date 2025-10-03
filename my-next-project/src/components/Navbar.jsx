

export default function Navbar(prop) {
    return(
        <>
                    <nav className="
   fixed top-4 left-1/2 -translate-x-1/2
    flex justify-around
    max-w-md py-2 px-2
    text-black
    transition-all
  "
>
                <ul className="flex items-center space-x-4">
                    <li>
                        <a href="/perfil">
                        <img
          src="/Fotos/FotoPerfilSara.png"
          alt="Foto de Perfil"
          className="w-15 h-15 object-cover rounded-full"
        />                        </a>
                    </li>
                    <li>
                        <p className="text-sm">Olá, <span className="font-bold">{prop.name}</span></p>
                    </li>
                    
                    
                </ul>
            </nav>

        </>
    )
}