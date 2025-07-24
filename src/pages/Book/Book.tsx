import { useState } from "react"
import { BiSolidSpreadsheet } from "react-icons/bi"
import { FaStar } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTelegram from "../../hooks/useTelegram"
import { useDeleteBookMutation, useGetOneBookQuery } from '../../services/booksApi'
import styles from './Book.module.css'

const Book = () => {
    const [isActiveButtonDelete, setIsActiveButtonDelete] = useState(false)
    const params = useParams()
    const id = params.id as string
    const { data: authData } = useAuth()
    const { tgID } = useTelegram()
    const navigate = useNavigate()

    const { data: book, isLoading, isError } = useGetOneBookQuery(id, { skip: !id })
    const [deleteBookMutation] = useDeleteBookMutation()

    const handleDeleteBook = async () => {
        if (!id) return
        
        try {
            await deleteBookMutation({ id, tgID }).unwrap()
            navigate(`/users/${book?.userId}`)
        } catch (error) {
            console.error("Ошибка при удалении книги:", error)
            setIsActiveButtonDelete(false)
        }
    }

    if (isLoading) return <div className={styles.loading}>Загрузка...</div>
    if (isError) return <div className={styles.error}>Ошибка загрузки книги</div>
    if (!book) return <div className={styles.error}>Книга не найдена</div>

    return (
        <div className={styles.container}>
            {!isActiveButtonDelete ? (
                <>
                    <div className={styles.bookCard}>
                        {(book.userId === authData?.id || authData?.role === 'admin') && (
                            <button 
                                className={styles.deleteButton}
                                onClick={() => setIsActiveButtonDelete(true)}
                                aria-label="Удалить книгу"
                            >
                                <MdDelete size={24} />
                            </button>
                        )}
                        
                        <div className={styles.header}>
                            <h2 className={styles.title}>{book.name}</h2>
                            <h5 className={styles.author}>{book.author}</h5>
                        </div>
                        
                        <div className={styles.meta}>
                            <span className={styles.pages}>
                                <BiSolidSpreadsheet className={styles.icon} />
                                {book.pageCount} стр.
                            </span>
                            <span className={styles.rating}>
                                <FaStar className={styles.star} />
                                {book.rating}
                            </span>
                        </div>
                    </div>
                    
                    <div className={styles.reviewSection}>
                        <h3 className={styles.reviewTitle}>Рецензия</h3>
                        <p className={styles.reviewText}>{book.review || "Нет рецензии"}</p>
                    </div>
                </>
            ) : (
                <div className={styles.confirmationDialog}>
                    <h3 className={styles.confirmationTitle}>Удалить книгу?</h3>
                    <p className={styles.confirmationText}>Вы уверены, что хотите удалить "{book.name}"?</p>
                    
                    <div className={styles.buttonsGroup}>
                        <button 
                            className={styles.confirmButton}
                            onClick={handleDeleteBook}
                        >
                            Удалить
                        </button>
                        <button 
                            className={styles.cancelButton}
                            onClick={() => setIsActiveButtonDelete(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Book