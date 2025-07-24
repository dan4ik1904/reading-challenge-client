import { FC } from "react"
import { MdMenuBook } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { IBook } from "../../../types/book.interface"
import styles from './BookCard.module.css'

interface IProps {
    book: IBook
}

const BookCard: FC<IProps> = ({ book }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.card} onClick={() => navigate(`/books/${book.id}`)}>
            <div className={styles.content}>
                <h3 className={styles.title}>{book.name}</h3>
                <p className={styles.author}>{book.author}</p>
            </div>
            <div className={styles.footer}>
                <span className={styles.pageCount}>
                    {book.pageCount} <MdMenuBook className={styles.icon} />
                </span>
            </div>
        </div>
    )
}

export default BookCard