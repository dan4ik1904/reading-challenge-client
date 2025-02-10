import { FC } from "react";
import { IBook } from "../../../types/book.interface";
import { MdMenuBook } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import itemStyles from '../../../css/Item.module.css'


interface IProps {
    book: IBook
}

const BookCard: FC<IProps> = ({book}) => {

    const nav = useNavigate()

    return (
        <div className={itemStyles.item} onClick={() => nav(`/books/${book.id}`)}>
            <div className="item__info__main">
                <h3>{book.name}</h3>
                <span>{book.author}</span>
            </div>
            <div className="item__info">
                <span>
                    <span className="highlight">{book.pageCount}</span> <MdMenuBook color="white" fontSize={'22px'} />
                </span>
            </div>
        </div>
        
    );
}

export default BookCard