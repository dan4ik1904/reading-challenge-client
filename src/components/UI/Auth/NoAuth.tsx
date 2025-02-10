import { Link } from "react-router-dom"
import './Auth.css'


const NoAuth = () => {
    return (
        <div className="no-auth">
            <Link to={'/auth'}>
                <div className="link">
                    <span>
                        Авторизироваться
                    </span>
                </div>
            </Link>
            
        </div>
    )
}

export default NoAuth