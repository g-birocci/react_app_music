'use client'

import { useSpotiHistory } from "@/hooks/useSpotiHistory"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { ChevronLeft } from "lucide-react";

// Componente para cada métrica
function Metric({ label, desc }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-base font-bold text-white drop-shadow">{label}</div>
      <div className="mt-2 rounded-2xl bg-white/90 text-slate-900 px-4 py-3 text-sm leading-relaxed shadow w-full">
        {desc}
      </div>
    </div>
  );
}

export default function ArtistPage() {
  const router = useRouter()
  const { nome } = router.query
  const [artistaNome, setArtistaNome] = useState("")

  const {
    percentualPlaysDoArtista,
    top20MusicasDoArtista,
    posicaoArtistaTop100,
    estacoesDoArtista
  } = useSpotiHistory()

  const [percentual, setPercentual] = useState('')
  const [top20, setTop20] = useState([])
  const [posicao, setPosicao] = useState('')
  const [estacoes, setEstacoes] = useState([])

  // Atualiza os estados do artista
  const atualizarInfoArtista = (nomeArtista) => {
    const novasEstacoes = estacoesDoArtista(nomeArtista)
    const novoPercentual = percentualPlaysDoArtista(nomeArtista)
    const novaPosicao = posicaoArtistaTop100(nomeArtista)
    const novoTop20 = top20MusicasDoArtista(nomeArtista)

    if (JSON.stringify(estacoes) !== JSON.stringify(novasEstacoes)) setEstacoes(novasEstacoes)
    if (percentual !== novoPercentual) setPercentual(novoPercentual)
    if (posicao !== novaPosicao) setPosicao(novaPosicao)
    if (JSON.stringify(top20) !== JSON.stringify(novoTop20)) setTop20(novoTop20)
  }

  // Atualiza estados quando o parâmetro "nome" muda
  useEffect(() => {
    if (!nome) return
    const decodedNome = decodeURIComponent(nome)
    setArtistaNome(decodedNome)

    if (top20MusicasDoArtista.length) {
      atualizarInfoArtista(decodedNome)
    }
  }, [nome, top20MusicasDoArtista])

  if (!nome) return <p>A carregar...</p>

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 text-white relative">
      <div className="max-w-[420px] mx-auto pb-32 px-4 relative z-10">

        {/* topo */}
        <div className="pt-3 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft />
          </button>
          <div className="ml-3 text-xs opacity-90 tracking-wide">
            INFORMAÇÃO ARTISTA
          </div>
        </div>

        {/* card do artista */}
        <div className="mt-5">
          <div className="mx-auto w-full">
            <img
              src="/Fotos/noImage.jpg"
              alt={artistaNome}
              className="w-full h-[320px] object-cover rounded-2xl shadow"
            />
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-center drop-shadow">
            {artistaNome}
          </h1>

          {/* métricas dinâmicas */}
          <div className="mt-8 space-y-5">
            <Metric label={`#${posicao || '-'}`} desc="Posição deste artista no teu Top 100" />
            <Metric
              label={
                percentual != null && !isNaN(Number(percentual))
                  ? `${Number(percentual).toFixed(2).replace('.', ',')}%`
                  : '-'
              }
              desc="Porcentagem deste artista na tua playlist"
            />
            <Metric label={top20.length || '-'} desc="Número de músicas diferentes que já ouviste deste artista" />
            <Metric label={estacoes.join(', ') || '-'} desc="Estações do ano em que mais ouves este artista" />
          </div>

          {/* lista de músicas */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Top 20 Músicas</h2>
            {top20.length > 0 ? (
              <ul>
                {top20.map((m, i) => (
                  <li key={i}>{m.musica} - {m.ms_played} min</li>
                ))}
              </ul>
            ) : (
              <p>A carregar músicas...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
