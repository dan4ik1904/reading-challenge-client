import { IoMdArrowRoundBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import './Header.css'

const pageTitles: Record<string, string> = {
  '/': 'Главная',
  '/mybooks': 'Мои книги',
  '/top': 'Топ лицея',
  '/classmates': 'Мои одноклассники',
  '/me': 'Мой профиль',
  '/mybooks/add': 'Добавление книги'
}

// Страницы, где не нужно показывать кнопку "назад"
const noBackButtonPages = ['/', '/mybooks', '/top', '/classmates', '/me']

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname

  const shouldShowBack = !noBackButtonPages.includes(currentPath)

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="header">
      <div className="header-content">
        {shouldShowBack ? (
          <button className="back-button" onClick={handleBack}>
            <IoMdArrowRoundBack color="#17999D" fontSize={'24px'} />
          </button>
        ) : (
          <div className="back-placeholder" />
        )}
        
        <h2 className="page-title">
          {pageTitles[currentPath] || currentPath.slice(1)}
        </h2>
      </div>
    </div>
  )
}

export default Header