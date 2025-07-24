import { useEffect } from 'react'
import { MdMenuBook } from 'react-icons/md'
import { useNavigate, useParams } from "react-router-dom"
import BookCard from "../../components/UI/Books/BookCard"
import Loading from "../../components/UI/Loading/Loading"
import pageStyles from '../../css/page.module.css'
import useAuth from '../../hooks/useAuth'
import { useGetBooksUserQuery } from "../../services/booksApi"
import styles from '../MyBooks/MyBooks.module.css'

const UserBooks = () => {
    const params = useParams();
    const userId = Number(params.userId)

    const { user } = useAuth()
    const nav = useNavigate()

    useEffect(() => {
        if(user?.id == userId) nav('/mybooks')
    }, [user])
    
    const { 
        data: userBooks = [], 
        isLoading, 
        isError 
    } = useGetBooksUserQuery(userId, { skip: !userId });

    if (isLoading) return <Loading />;
    if (isError) return <div>Error loading books</div>;

    return (
        <div className={styles.container}>
            {userBooks.length > 0 ? (
                <div className={styles.booksGrid + ' ' + pageStyles.page__item}>
                    {userBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIllustration}>
                        <MdMenuBook size={64} color="#4A4A4A" />
                    </div>
                    <h2>Библиотека пуста</h2>
                </div>
            )}
        </div>
    );
};

export default UserBooks;