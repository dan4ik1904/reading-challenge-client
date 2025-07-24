import { useParams } from "react-router-dom"
import BookCard from "../../components/UI/Books/BookCard"
import Loading from "../../components/UI/Loading/Loading"
import itemStyles from '../../css/Item.module.css'
import { useGetBooksUserQuery } from "../../services/booksApi"

const UserBooks = () => {
    const params = useParams();
    const userId = params.userId as string;
    
    const { 
        data: userBooks = [], 
        isLoading, 
        isError 
    } = useGetBooksUserQuery(userId, { skip: !userId });

    if (isLoading) return <Loading />;
    if (isError) return <div>Error loading books</div>;

    return (
        <div className={itemStyles.items}>
            {userBooks.length > 0 ? (
                userBooks.map((book) => (
                    <BookCard 
                        key={book.id} 
                        book={book} 
                    />
                ))
            ) : (
                <h2 style={{ textAlign: 'center' }}>Здесь пока ничего нет :(</h2>
            )}
        </div>
    );
};

export default UserBooks;