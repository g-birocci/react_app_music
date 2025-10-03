import "@/styles/globals.css";
import { Montserrat_Alternates } from 'next/font/google';
import { UserProvider } from "../estadoGlobal/UserContext"; // Estado que altera nome e país ao editar perfil.
import BottomBar from "@/components/BottomBar";
import Footer from "@/components/Footer";


//LETRA PADRÃO PARA TODO O APLICATIVO
const mont = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className={`${mont.className} max-w-[420px] mx-auto min-h-screen bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 text-white flex flex-col`}>
      
      <div className="relative min-h-screen">
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Component {...pageProps} />
        </main>
        <BottomBar />
</div>
        <Footer />
      </div>
    </UserProvider>
  );
}
