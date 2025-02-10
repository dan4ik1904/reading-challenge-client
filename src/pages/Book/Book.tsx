import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BiSolidSpreadsheet } from "react-icons/bi";
import books from "../../stores/books"
import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import useTelegram from "../../hooks/useTelegram";
import { observer } from "mobx-react-lite";
import useAuth from "../../hooks/useAuth";
import itemStyles from '../../css/Item.module.css'
import styles from './Book.module.css'


const Book = observer(() => {

    const [isActiveButtonDelete, setIsActiveButtonDelete] = useState(false)

    const params = useParams()
    const id = params.id

    const { data } = useAuth()

    const { tgID } = useTelegram()

    const nav = useNavigate()

    useEffect(() => {
        if(id) books.fetchOneBook(id)
    }, [id])

    const deleteBook = () => {
        if(id)books.deleteBook(id, tgID)
        nav('/mybooks')
    }

    return (
        <div className={itemStyles.items}>
            {isActiveButtonDelete === false ? (
                <>
                    <div className={styles.info__book}>
                        {books.book?.userId == data?.id || data?.role === 'admin' && books.isLoading === false && (
                            <div className={styles.delete} >
                                <MdDelete fontSize={'25px'} color={'red'} onClick={() =>  setIsActiveButtonDelete(true)} />
                            </div>
                        )}
                        
                        <div className={styles.title}>
                            <h2>{books.book?.name}</h2>
                            <h5>{books.book?.author}</h5>
                        </div>
                        <div className={styles.info}>
                            <span>{books.book?.pageCount}<BiSolidSpreadsheet /></span>
                            <span>{books.book?.ratting}<FaStar fontSize={'18px'} color="yellow"/></span>
                        </div>
                    </div>
                    <div className={styles.review}>
                        <h6>Ревью:</h6>
                        <p>{books.book?.review}</p>
                    </div>
                </>
                    
            ): (
              <div className="title">
                <h6>Точно удалить?</h6>
                <button onClick={() => deleteBook()}>Удалить</button>
                <button onClick={() => setIsActiveButtonDelete(false)}>Отмена</button>
              </div>  
            )}
        </div>
        
        
    )
})

export default Book