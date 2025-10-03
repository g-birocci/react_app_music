import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHome, FaChartBar, FaSearch } from 'react-icons/fa'

export default function Navbar() {
  const router = useRouter()
  const isActive = (path) => router.pathname === path

  const navItems = [
    { href: '/',        icon: <FaHome size={22} />,      label: 'Home' },
    { href: '/top100',  icon: <FaChartBar size={22} />,  label: 'Biblioteca' },
    { href: '/pesquisa',icon: <FaSearch size={22} />,    label: 'Pesquisar' },
  ]

  return (
    <nav
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2
        z-[9999]                 /* << z-index mais alto para garantir prioridade */
        pointer-events-auto      /* << garante que recebe cliques */
        bg-white/80 backdrop-blur-md
        border border-gray-200 shadow-lg rounded-2xl
        flex justify-around items-center
        w-[90%] max-w-md py-2 px-2
        isolate                  /* << cria novo contexto de empilhamento */
      "
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`
            relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl
            transition-all duration-300
            ${isActive(item.href)
              ? 'text-blue-600 bg-blue-50 shadow-md scale-105'
              : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100'
            }
          `}
        >
          {item.icon}
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
