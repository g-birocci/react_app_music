import Top100 from "../components/Top100";      // componente que já criaste
import { topSongs, topArtists } from "../data/top100";  // os mocks

export default function Top100Page() {
  return <Top100 songs={topSongs} artists={topArtists} />;
}
