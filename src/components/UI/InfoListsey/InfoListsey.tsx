import { FC, useEffect } from "react";
import books from "../../../stores/books";
import { FaBook } from "react-icons/fa6";
import { observer } from "mobx-react-lite";
import styles from './InfoListsey.module.css'
import pageStyles from '../../../css/page.module.css'

const InfoLitsey: FC = observer(() => {

    useEffect(() => {
        books.fetchAllBooks()
    }, [])


    return (
        <div className={pageStyles.page__item}>
            <div className={styles.litsey__logo}>
                <img src="ec8b418d-d4dc-4264-8d29-a8f907ad4898.png"/>
            </div>
            <div className={styles.info}>
                {books.books ? (
                        <span>{books.books.length}/500<FaBook color='white' fontSize={'26px'} /></span>
                    ): (
                        <span>loading...</span>
                )}
            </div>
        </div>
    )
})

export default InfoLitsey