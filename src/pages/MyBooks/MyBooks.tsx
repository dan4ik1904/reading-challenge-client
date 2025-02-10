import { useEffect } from "react"
import NoAuth from "../../components/UI/Auth/NoAuth"
import Loading from "../../components/UI/Loading/Loading"
import useAuth from "../../hooks/useAuth"
import books from "../../stores/books"
import useTelegram from "../../hooks/useTelegram"
import AddBook from "../../components/UI/Books/AddBookButton"
import { observer } from "mobx-react-lite"
import BookCard from "../../components/UI/Books/BookCard"
import itemStyles from '../../css/Item.module.css'


const MyBooks = observer(() => {
    const {isAuthenticated, loading} = useAuth()
    const { tgID } = useTelegram()

    useEffect(() => {
        try {
            books.fetchMybooks(tgID)
        } catch (error) {
            
        }
        
    }, [tgID])

    if(loading === true) return <Loading />

    
    if(isAuthenticated === false) return <NoAuth />
    return (
        <div className={itemStyles.items}>
            <AddBook />
            {books.myBooks.length > 0 ? (
                books.myBooks.map((book) => (
                    book && (
                        <BookCard
                            book={book}
                        />
                    )
                ))
            ): (
                <h2 style={{textAlign: 'center' }}>Здесь пока ничего нет :(</h2>
            )}
        </div>
    );

})

export default MyBooks