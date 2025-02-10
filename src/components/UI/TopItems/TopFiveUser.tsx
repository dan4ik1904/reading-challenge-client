import { observer } from 'mobx-react-lite'
import { FaBook } from "react-icons/fa6";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../../types/user.interface';
import styles from './topItems.module.css'
import pageStyles from '../../../css/page.module.css'


interface IProps {
    users: IUser[] | null[],
    title: string,
    user: IUser | null
}

const TopFiveUser = observer(({ users, title, user }: IProps) => {

    if(!users) return <></>

    const nav = useNavigate()

    const topUsers = [...users].slice(0, 5);
    const userInTop = topUsers.some(topUser => topUser?.id === user?.id);

    if (!userInTop && user) {
        topUsers[4] = { ...user, id: user.id }; // Just copy existing props, no place is needed
    }

    return (
        <div className={pageStyles.page__item}>
            <div className={ styles.title }><h2>{title}</h2></div>
            <div className={ styles.top__items } >
                {topUsers.map((userEl, index) => (
                    <div key={userEl?.id || index} style={{cursor: 'pointer'}} className={styles.top__item} onClick={() => {userEl?.id ? nav(`/users/${userEl.id}`) : nav('/')}}>
                        <div className={ styles.place }>
                           {userEl?.id === user?.id && !userInTop ? '...' : index + 1} {/* Conditionally render place */}
                        </div>
                        <div className={ styles.name }><span>{userEl?.fullName}</span></div>
                        <div className={ styles.info__user }>
                            <div className={ styles.books }>
                                <span>{userEl?.booksCount}</span><FaBook />
                            </div>
                            <div className={ styles.pages }>
                                <span>{userEl?.pagesCount}</span><BiSolidSpreadsheet />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* ... */}
        </div>
    );
});

export default TopFiveUser