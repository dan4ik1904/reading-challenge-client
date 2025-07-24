import { MdMenuBook } from 'react-icons/md'
import AddBook from "../../components/UI/Books/AddBookButton"
import BookCard from "../../components/UI/Books/BookCard"
import Loading from "../../components/UI/Loading/Loading"
import pageStyles from '../../css/page.module.css'
import useTelegram from "../../hooks/useTelegram"
import { useGetMyBooksQuery } from '../../services/booksApi'
import styles from './MyBooks.module.css'


const MyBooks = () => {
    const { tgID } = useTelegram();

    const { 
        data: myBooks = [], 
        isLoading, 
        isError, 
        refetch 
    } = useGetMyBooksQuery(tgID!, { skip: !tgID });

    if (isLoading) return (
        <div className={styles.loadingContainer}>
            <Loading />
        </div>
    );
    
    if (isError) return (
        <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
                <h2>Ошибка загрузки</h2>
                <p>Попробуйте обновить страницу</p>
                <button 
                    className={styles.retryButton}
                    onClick={() => refetch()}
                >
                    Повторить
                </button>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <AddBook />
            
            {myBooks.length > 0 ? (
                <div className={styles.booksGrid + ' ' + pageStyles.page__item}>
                    {myBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIllustration}>
                        <MdMenuBook size={64} color="#4A4A4A" />
                    </div>
                    <h2>Ваша библиотека пуста</h2>
                    <p>Добавьте свою первую книгу</p>
                </div>
            )}
        </div>
    );
};

export default MyBooks;