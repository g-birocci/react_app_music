 
  export default function SearchResults({ musicas, albuns, artistas, termo }) {
    if (!termo) return null
    return (
      <div className="mt-4 space-y-4 text-black">
        <div>
          {/* <h2>Músicas</h2> */}
          {musicas.slice(0, 10).map((m, i) => (
            <p key={i}>{m.master_metadata_track_name} - {m.master_metadata_album_artist_name}</p>
          ))}
        </div>
  
        <div>
          {/* <h2>Álbuns</h2> */}
          {albuns.slice(0, 10).map((m, i) => (
            <p key={i}>{m.master_metadata_album_name} - {m.master_metadata_album_artist_name}</p>
          ))}
        </div>
  
        <div>
          {/* <h2>Artistas</h2> */}
          {Array.from(new Set(artistas.map(a => a.master_metadata_album_artist_name))).slice(0, 10)
            .map((artista, i) => <p key={i}>{artista}</p>)}
        </div>
      </div>
    );
  }
  