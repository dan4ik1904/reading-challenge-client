import './Header.css'
import { IoMdArrowRoundBack } from "react-icons/io";


const Header = () => {

    const pages: any = {
        '/': 'Главная',
        '/mybooks': 'Мои книги',
        '/top': 'Топ лицея',
        '/classmates': 'Мои одноклассники',
        '/me': 'Мой профиль',
        '/mybooks/add': 'Добавление книги'
    }

    const pathname = window.location.pathname

    const back = () => {
        window.history.back()
    }

    return (
        <div className="header">
            <div className="back">
                { pathname !== '/' && (
                    <IoMdArrowRoundBack onClick={() => back()} color='white'/>
                ) }
            </div>
            <div className="info">
                {pages[pathname]}
            </div>
        </div>
    )
}

export default Header