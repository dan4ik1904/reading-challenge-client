import { CgProfile } from 'react-icons/cg'
import { IoHomeOutline } from "react-icons/io5"
import { LiaMedalSolid, LiaUserFriendsSolid } from 'react-icons/lia'
import { PiBooks } from 'react-icons/pi'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

function Nav() {
  const location = useLocation()
  const currentPath = location.pathname

  // Определяем активные маршруты
  const isActive = (path: string) => {
    // Для главной страницы точное совпадение
    if (path === '/') return currentPath === path
    // Для остальных - начало пути
    return currentPath.startsWith(path)
  }

  const navItems = [
    { path: '/', icon: <IoHomeOutline fontSize={'40px'}/>, label: 'Главная' },
    { path: '/mybooks', icon: <PiBooks fontSize={'40px'}/>, label: 'Книги' },
    { path: '/top', icon: <LiaMedalSolid fontSize={'40px'}/>, label: 'Топ' },
    { path: '/classmates', icon: <LiaUserFriendsSolid fontSize={'40px'}/>, label: 'Класс' },
    { path: '/me', icon: <CgProfile fontSize={'40px'}/>, label: 'Профиль' }
  ]

  return (
    <div className="mobile__bottom">
      <div className="nav container">
        {navItems.map((item) => (
          <Link 
            to={item.path} 
            key={item.path}
            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            aria-label={item.label}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Nav