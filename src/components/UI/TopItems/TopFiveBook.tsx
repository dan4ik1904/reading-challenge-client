import { motion, Variants } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { FaBook, FaStar } from "react-icons/fa"
import { NavLink, useNavigate } from 'react-router-dom'
import itemStyles from '../../../css/Item.module.css'
import pageStyles from '../../../css/page.module.css'
import { IBook } from '../../../types/book.interface'
import { IUser } from '../../../types/user.interface'
import styles from './TopFiveBook.module.css'

interface IProps {
    books: IBook[] | null[] | undefined,
    title: string,
    currentUser: IUser
}

const TopFiveBook = observer(({ books, title, currentUser }: IProps) => {
    const nav = useNavigate()
    
    if(!books) return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={itemStyles.item}
        >
            <span>Здесь пока ничего нет :(</span>
        </motion.div>
    )

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        }
    }

    // Get top 5 books
    const topBooks = books.slice(0, 5)

    return (
        <div className={pageStyles.page__item}>
            <motion.div 
                className={itemStyles.item}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <NavLink to={`/users/${currentUser.id}/books`}>
                    <motion.div 
                        className={styles.all}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Все
                    </motion.div>
                </NavLink>
                
                <motion.div 
                    className={styles.title}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.div>

                {topBooks.length > 0 ? (
                    <motion.div className={styles.booksList}>
                        {topBooks.map((book, index) => (
                            book && (
                                <motion.div
                                    key={book.id}
                                    className={styles.bookItem}
                                    onClick={() => nav(`/books/${book.id}`)}
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className={styles.place}>{index + 1}</div>
                                    <div className={styles.name} title={book.name}>
                                        {book.name.length > 25 ? ( 
                                            <>{book.name.slice(0, 25)}...</>
                                        ) : (
                                            <>{book.name}</>
                                        )}
                                    </div>
                                    <div className={styles.info}>
                                        <span>{book.pageCount} <FaBook /></span>
                                        <span>{book.rating} <FaStar color='gold' /></span>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </motion.div>
                ) : (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Здесь пока ничего нет :(
                    </motion.span>
                )}
            </motion.div>
        </div>
    )
})

export default TopFiveBook