import { useState } from "react"
import { useSpotiHistory } from "@/hooks/useSpotiHistory"
import SearchInput from "@/components/SearchInput"
import SearchResults from "@/components/SearchResult"
import Navbar from "@/components/Navbar";

export default function Pesquisa() {

  const { loading, pesquisar } = useSpotiHistory()
  const [termo, setTermo] = useState("")
  const { musicas, albuns, artistas } = pesquisar(termo)

  if (loading) {
    return <p className="max-w-[420px] mx-auto text-3xl font-bold text-center py-10">
      A carregar histórico...
    </p>
  }

  return (
    <>
      <div className="pt-20">
        <div className="p-4">
          <SearchInput termo={termo} setTermo={setTermo} />
        </div>
        <SearchResults musicas={musicas} albuns={albuns} artistas={artistas} termo={termo} />

      </div>
    </>
  )
}