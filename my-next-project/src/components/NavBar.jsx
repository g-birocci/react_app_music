import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHome, FaChartBar, FaSearch } from 'react-icons/fa'

export default function Navbar() {
  const router = useRouter()
  const isActive = (path) => router.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 flex justify-around items-center py-3">
      <Link 
        href="/" 
        className={`flex flex-col items-center ${isActive('/') ? 'text-blue-600' : 'text-gray-600'}`}
      >
        <FaHome size={22} />
      </Link>

      <Link 
        href="/estatisticas" 
        className={`flex flex-col items-center ${isActive('/estatisticas') ? 'text-blue-600' : 'text-gray-600'}`}
      >
        <FaChartBar size={22} />
      </Link>

      <Link 
        href="/pesquisa" 
        className={`flex flex-col items-center ${isActive('/pesquisa') ? 'text-blue-600' : 'text-gray-600'}`}
      >
        <FaSearch size={22} />
      </Link>
    </nav>
  )
}
