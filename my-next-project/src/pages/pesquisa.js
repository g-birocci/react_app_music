import { useState, useEffect } from "react"
import { useSpotiHistory } from "@/hooks/useSpotiHistory"
import SearchInput from "@/components/SearchInput"
import SearchResults from "@/components/SearchResult"
import Navbar from "@/components/Navbar"

export default function Pesquisa() {
  const { loading, pesquisar } = useSpotiHistory()
  const [termo, setTermo] = useState("")
  const [resultados, setResultados] = useState({
    musicas: [],
    albuns: [],
    artistas: [],
  })
  const [carregandoPesquisa, setCarregandoPesquisa] = useState(false)

  useEffect(() => {
    if (!termo) {
      setResultados({ musicas: [], albuns: [], artistas: [] })
      return
    }

    setCarregandoPesquisa(true)
    const res = pesquisar(termo) // Se for async: await pesquisar(termo)
    setResultados(res)
    setCarregandoPesquisa(false)
  }, [termo, pesquisar])

  if (loading) {
    return (
      <p className="max-w-[420px] mx-auto text-3xl font-bold text-center py-10">
        A carregar histórico...
      </p>
    )
  }

  const { musicas, albuns, artistas } = resultados

  return (
    <>
      <Navbar />
      <div className="pt-24 px-4 md:px-20">
        {/* Animação + frase */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Explore suas músicas favoritas!
          </h1>
          <p className="text-gray-500 mt-2">
            Pesquise músicas, álbuns ou artistas e descubra o que você mais gosta 🎵
          </p>
        </div>

        {/* Barra de pesquisa */}
        <div className="mb-6">
          <SearchInput termo={termo} setTermo={setTermo} />
        </div>

        {/* Mensagens ou resultados */}
        {carregandoPesquisa ? (
          <p className="text-center text-2xl py-20">Carregando resultados...</p>
        ) : termo === "" ? (
          <p className="text-center text-xl md:text-2xl py-20 text-gray-500 animate-pulse">
            Comece a digitar algo na barra de pesquisa acima ✨
          </p>
        ) : musicas.length === 0 && albuns.length === 0 && artistas.length === 0 ? (
          <p className="text-center text-2xl py-20 text-gray-500">
            Nenhum resultado encontrado 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SearchResults
              musicas={musicas}
              albuns={albuns}
              artistas={artistas}
              termo={termo}
            />
          </div>
        )}
      </div>
    </>
  )
}
