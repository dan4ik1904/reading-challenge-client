import { useEffect } from "react"
import Loading from "../../components/UI/Loading/Loading"
import books from "../../stores/books"
import { observer } from "mobx-react-lite"
import BookCard from "../../components/UI/Books/BookCard"
import { useParams } from "react-router-dom"
import itemStyles from '../../css/Item.module.css'


const UserBooks = observer(() => {
    
    const params = useParams()
    const userId = params.userId

    useEffect(() => {
        try {
            if(userId)books.fetchBooksUser(userId)
        } catch (error) {
            
        }
        
    }, [userId])

    if(books.isLoading === true) return <Loading />
    return (
        <div className={itemStyles.items}>
            {books.userBooks.length > 0 ? (
                books.userBooks.map((book) => (
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

export default UserBooks