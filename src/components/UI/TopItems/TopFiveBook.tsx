import { observer } from 'mobx-react-lite'
import { FaBook } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { IUser } from '../../../types/user.interface';
import { IBook } from '../../../types/book.interface';
import pageStyles from '../../../css/page.module.css'
import styles from './topItems.module.css'


interface IProps {
    books: IBook[] | null[] | undefined,
    title: string,
    currentUser: IUser
}

const TopFiveBook = observer(({ books, title, currentUser }: IProps) => {

    const nav = useNavigate()
    
    if(!books) return <span>Здесь пока ничего нет :(</span>
    return (
    <div className={pageStyles.page__item}>
        <NavLink to={`/users/${currentUser.id}/books`}>
            <div className={styles.all}>
                Все
            </div>
        </NavLink>
        <div className={styles.title}>
            {title}
        </div>
        <div className={styles.top__items}>
            {books.length > 0 ? (
                <>{books.slice(0, 5).map((book, key) => (
                    <div className={styles.top__item} style={{cursor: 'pointer'}} onClick={() => nav(`/books/${book?.id}`)}>
                        <div className={styles.place}> 
                            {key+1}
                        </div>
                        <div className={styles.name}>
                            <span>{book?.name}</span>
                        </div>
                        <div className={styles.info__user}>
                            <div className={styles.books}>
                                <span>{book?.pageCount}</span>
                                <FaBook fontSize={'20px'} />
                            </div>
                            <div className={styles.pages}>
                                <span>{book?.ratting}</span>
                                <FaStar color='yellow' fontSize={'20px'}/>
                            </div>
                        </div>
                    </div>
                ))}</>
            ) : (
                <span>Здесь пока ничего нет :(</span>
            )}
        </div>
    </div>
    )
})

export default TopFiveBook