import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../types/user.interface";
import { MdMenuBook } from "react-icons/md";
import itemStyles from '../../../css/Item.module.css'


interface IProps {
    user: IUser | null
}

const UserTopCard: FC<IProps> = ({user}) => {

    if(!user) return <></>

    const navigate = useNavigate()

    const link = () => {
        navigate(`/users/${user.id}`)
    }

    return (
            <div className={itemStyles.item} onClick={link}>
                <div className={itemStyles.item__info__main}>
                    <h3>{user.fullName}</h3>
                    <h4>{user.className}</h4>
                </div>
                <div className={itemStyles.item__info}>
                    <span>
                        <span className={itemStyles.highlight}>{user.booksCount}</span> книг
                    </span>
                    <span>
                        <span className={itemStyles.highlight}>{user.pagesCount}</span> <MdMenuBook color="white" fontSize={'22px'} />
                    </span>
                </div>
            </div>
    );
}

export default UserTopCard