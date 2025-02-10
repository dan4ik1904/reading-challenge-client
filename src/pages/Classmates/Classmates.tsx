import { observer } from "mobx-react-lite"
import users from "../../stores/users"
import Loading from "../../components/UI/Loading/Loading"
import UserTopCard from "../../components/UI/UserTopCard/UserTopCard"
import { useEffect } from "react"
import useTelegram from "../../hooks/useTelegram"
import NoAuth from "../../components/UI/Auth/NoAuth"
import useAuth from "../../hooks/useAuth"
import itemStyles from '../../css/Item.module.css'


const Classmates = observer(() => {

    const { tgID } = useTelegram()
    const { isAuthenticated, loading } = useAuth()

    useEffect(() => {
        if(tgID) users.fetchClassmaets(tgID)
    }, [tgID])

    if(users.isLoading === true) return <Loading />

    if(isAuthenticated === false && loading === false) return <NoAuth />
    return (
        <div className={itemStyles.items}>
            {users.classmates && (
                <>
                    {users.classmates.map(user => (
                        <><UserTopCard user={user}/></>
                    ))}
                </>
            )}
        </div>
    )
})

export default Classmates