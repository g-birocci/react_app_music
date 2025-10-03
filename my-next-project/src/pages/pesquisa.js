import { useState } from "react"
import { useSpotiHistory } from "@/hooks/useSpotiHistory"
import SearchInput from "@/components/SearchInput"
import SearchResults from "@/components/SearchResult"

export default function Pesquisa() {

  const {loading, pesquisar} = useSpotiHistory()
  const [termo, setTermo] = useState("")
  const {musicas, albuns, artistas} = pesquisar(termo)

  if (loading) {
    return <p className="max-w-[420px] mx-auto text-3xl font-bold text-center py-10">
      A carregar histórico...
      </p>
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">🔍 Pesquisar</h1>
      <p className="text-gray-600 mb-6">Encontre seus artistas, músicas e álbuns favoritos</p>
      <SearchInput termo={termo} setTermo={setTermo}/>
      <SearchResults musicas={musicas} albuns={albuns} artistas={artistas} termo={termo}/>
    </div>
  )
}