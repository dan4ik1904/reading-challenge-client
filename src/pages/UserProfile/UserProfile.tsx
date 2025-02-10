import { observer } from "mobx-react-lite"
import Loading from "../../components/UI/Loading/Loading"
import MeInfo from "../../components/UI/Me/MeInfo"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import users from "../../stores/users"
import books from "../../stores/books"
import TopFiveBook from "../../components/UI/TopItems/TopFiveBook"
import TopFiveUser from "../../components/UI/TopItems/TopFiveUser"
import itemStyles from '../../css/Item.module.css'


const UserProfile = observer(() => {

    // const {isAuthenticated, loading, data} = useAuth()

    const params = useParams()
    const userId = params.userId

    useEffect(() => {
        const fetch = () => {
            users.resetTopFiveUsers()
            .then(() => {
                if(userId) {
                    Promise.all([
                    users.fetchUser(userId),
                    books.fetchBooksUser(userId),
                    users.fetchTopFiveUsers()
                ]) 
            }
            }) 
            
        }
        fetch()
    }, [])

    if(users.isLoading === true) return <Loading />
    if(!users.oneUser) return <></>
    return (
        <div className={itemStyles.items}>
            <MeInfo me={users.oneUser}/>
            {users.oneUser && <TopFiveBook currentUser={users.oneUser} title="Топ 5 книг" books={books.userBooks} />}
            <TopFiveUser title="В топ 5 лицея" user={users.oneUser} users={users.topFiveUsers} />
        </div>
    )
})

export default UserProfile