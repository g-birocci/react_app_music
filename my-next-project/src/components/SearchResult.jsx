"use client"
import { useState } from "react";
import Link from "next/link";

export default function SearchResults({ musicas, albuns, artistas, termo }) {
  const [tab, setTab] = useState("musicas");

  if (!termo) return null;

  return (
    <div className="bg-white rounded-md px-8 pt-2">
      {/* Abas */}
      <div className="flex gap-4 border-b border-gray-200">
        {["musicas", "albuns", "artistas"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-2 px-4 ${
              tab === t ? "border-b-2 border-blue-500 font-medium text-blue-600" : "text-gray-500"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="mt-4 space-y-4 text-black">
        {tab === "musicas" && (
          <div>
            {musicas.slice(0, 10).map((m, i) => (
              <span key={i} className="block">
                <p>{m.master_metadata_track_name}</p>
                <p className="text-sm text-neutral-400">
                  Song by {m.master_metadata_album_artist_name}
                </p>
              </span>
            ))}
          </div>
        )}

        {tab === "albuns" && (
          <div>
            {albuns.slice(0, 10).map((m, i) => (
              <span key={i} className="block">
                <p>{m.master_metadata_album_album_name}</p>
                <p className="text-sm text-neutral-400">
                  Album by {m.master_metadata_album_artist_name}
                </p>
              </span>
            ))}
          </div>
        )}

        {tab === "artistas" && (
          <div>
            {artistas.slice(0, 1).map((m, i) => (
              <span key={i} className="block">
                <Link href={`/artista/${encodeURIComponent(m.master_metadata_album_artist_name)}`}>
                  <p>{m.master_metadata_album_artist_name}</p>
                </Link>
                <p className="text-sm text-neutral-400">Artist</p>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
