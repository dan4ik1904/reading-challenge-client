import { FC } from "react"
import { MdMenuBook } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { IUser } from "../../../types/user.interface"
import styles from './UserTopCard.module.css'

interface IProps {
  user: IUser | null;
}

const UserTopCard: FC<IProps> = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  const handleClick = () => navigate(`/users/${user.id}`);

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.avatar}>
        {user.fullName[0].toUpperCase()}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{user.fullName}</h3>
        <p className={styles.class}>{user.className}</p>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user.booksCount}</span>
            <span className={styles.statLabel}>книг</span>
          </div>
          
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user.pagesCount}</span>
            <MdMenuBook className={styles.bookIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTopCard;