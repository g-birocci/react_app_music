import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHome, FaChartBar, FaSearch } from 'react-icons/fa'

export default function BottomBar() {
  const router = useRouter()
  const isActive = (path) => router.pathname === path

  const navItems = [
    { href: '/', icon: <FaHome size={22} />, label: 'Home' },
    { href: '/top100', icon: <FaChartBar size={22} />, label: 'Biblioteca' },
    { href: '/pesquisa', icon: <FaSearch size={22} />, label: 'Pesquisar' },
  ]

  return (
    <nav className="
      fixed bottom-4 left-1/2 -translate-x-1/2
      bg-white/80 backdrop-blur-sm
      border border-gray-200
      shadow-lg rounded-full
      flex justify-around items-center w-max max-w-md py-1 px-2
      transition-all
    ">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`
            relative flex flex-col items-center px-4 py-2 rounded-full
            transition-all duration-300
            ${isActive(item.href)
              ? 'text-blue-600 bg-gray-300 scale-105'
              : 'text-gray-500 hover:text-blue-500'
            }
          `}
        >
          
          <span className="text-xs justify-items-center">
             {/* {item.icon}  */}
             {item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
