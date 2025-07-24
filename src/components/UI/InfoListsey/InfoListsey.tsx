import { useMotionValue, useSpring } from "framer-motion"
import { FC, useEffect, useState } from "react"
import { FaBook } from "react-icons/fa6"
import pageStyles from '../../../css/page.module.css'
import { useGetAllBooksQuery } from "../../../services/booksApi"
import styles from './InfoListsey.module.css'

const InfoLitsey: FC = () => {
    const { data: books, isLoading, isError } = useGetAllBooksQuery();
    const count = useMotionValue(0);
    const springCount = useSpring(count, {
        damping: 100,
        stiffness: 100,
    });
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        const unsubscribe = springCount.onChange((latest) => {
            setDisplayCount(Math.floor(latest));
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (books?.length) {
            count.set(books.length);
        }
    }, [books]);

    return (
        <div className={pageStyles.page__item + ' ' + 'item'}>
            <div className={styles.litsey__logo}>
                <img src="ec8b418d-d4dc-4264-8d29-a8f907ad4898.png" alt="Litsey Logo" />
            </div>
            <div className={styles.info}>
                {isLoading ? (
                    <span>loading...</span>
                ) : isError ? (
                    <span>error</span>
                ) : (
                    <span>
                        {displayCount}/500
                        <FaBook color='white' fontSize={'26px'} />
                    </span>
                )}
            </div>
        </div>
    );
};

export default InfoLitsey;