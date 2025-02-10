import { observer } from "mobx-react-lite"
import { useEffect } from 'react'
import NoAuth from "../../components/UI/Auth/NoAuth"
import Loading from "../../components/UI/Loading/Loading"
import MeInfo from "../../components/UI/Me/MeInfo"
import useAuth from "../../hooks/useAuth"
import books from "../../stores/books"
import useTelegram from "../../hooks/useTelegram"
import users from "../../stores/users"
import { useNavigate } from "react-router-dom"
import TopFiveBook from "../../components/UI/TopItems/TopFiveBook"
import TopFiveUser from "../../components/UI/TopItems/TopFiveUser"
import pageStyles from '../../css/page.module.css'


const Me = observer(() => {

    const {isAuthenticated, loading, data} = useAuth()
    const { tgID } = useTelegram()

    const nav = useNavigate()

    useEffect(() => {
        users.resetTopFiveUsers()
        .then(() => {
            Promise.all([
                books.fetchMybooks(tgID),
                users.fetchTopFiveUsers(),
            ])
        })
    }, [])

    useEffect(() => {
        if(tgID) users.fetchClassmaets(tgID)
    }, [tgID])

    const logout = () => {
        users.authLogout(tgID)
        .finally(() => {
            nav('/')
        })
    }

    if(loading === true || users.isLoading) return <Loading />

    if(isAuthenticated === false) return <NoAuth />
    return (
        <div className={pageStyles.page__items}>
            {users.isAvtiveLogoutButton ? (
                <div>
                    <h6>Вы точно хотите выйти?</h6>
                    <button onClick={() => logout()}>Выйти</button>
                    <button onClick={() => users.isAvtiveLogoutButton = false}>Отмена</button>
                </div>
            ) : (
                <>
                    {data && <MeInfo me={data} thisMe />}
                    {data && <TopFiveBook currentUser={data} title="Топ 5 книг" books={books.myBooks} />}
                    {data && <TopFiveUser title="В топ 5 лицея" users={users.topFiveUsers} user={data} />}
                    {users.classmates.length > 0 && data && (
                        <TopFiveUser title="В топ 5 одноклассников" users={users.classmates} user={data} />
                    )}
                </>
            )}
        </div>
    )
})

export default Me