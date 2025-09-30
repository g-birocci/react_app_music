import "@/styles/globals.css";
import { Montserrat_Alternates } from 'next/font/google';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


//LETRA PADRÃO PARA TODO O APLICATIVO
const mont = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['400','600','700'],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${mont.className} min-h-screen bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 text-white flex flex-col`}>
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
