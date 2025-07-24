import { FC } from 'react'
import { BiSolidSpreadsheet } from 'react-icons/bi'
import { FaBook } from 'react-icons/fa6'
import { IoLogOut } from "react-icons/io5"
import pageStyles from '../../../css/page.module.css'
import { IUser } from '../../../types/user.interface'
import styles from './Me.module.css'


interface IProps {
    me: IUser;
    thisMe?: boolean;
    onLogout?: () => void;
}

const MeInfo: FC<IProps> = ({ me, thisMe, onLogout }) => {
    return (
        <div className={styles.me__item + ' ' + pageStyles.page__item}>
            {thisMe && onLogout && (
                <div className={styles.delete} style={{ cursor: 'pointer' }}>
                    <IoLogOut 
                        fontSize={'30px'} 
                        color='red' 
                        onClick={onLogout} 
                        aria-label="Logout"
                    />
                </div> 
            )}
            <div className={styles.me__avatar__wrapper}>
                <div className={styles.avatar}>
                    <span>{me.fullName[0]}</span>
                </div>
            </div>
            <div className={styles.me__info}>
                <div className={styles.man}>
                    <h3>{me.fullName}</h3>
                    <h4>{me.className}</h4>
                </div>
                <div className={styles.book}>
                    <span>{me.booksCount}<FaBook color='white' fontSize={'20px'} /></span><br />
                    <span>{me.pagesCount}<BiSolidSpreadsheet fontSize={'20px'} /></span>
                </div>
            </div>
        </div>
    )
}

export default MeInfo