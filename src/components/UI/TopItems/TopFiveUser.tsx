import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { BiSolidSpreadsheet } from "react-icons/bi"
import { FaBook } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import pageStyles from '../../../css/page.module.css'
import { IUser } from '../../../types/user.interface'
import styles from './TopFiveUser.module.css'

interface IProps {
    users: IUser[] | null[],
    title: string,
    user: IUser | null
}

const TopFiveUser = observer(({ users, title, user }: IProps) => {
    if(!users) return <></>

    const nav = useNavigate()

    const topUsers = [...users].slice(0, 5);
    const userInTop = topUsers.some(topUser => topUser?.id === user?.id);

    if (!userInTop && user) {
        topUsers[4] = { ...user, id: user.id };
    }

    // Format name to show first name and initial of last name
    const formatName = (fullName: string | undefined) => {
        if (!fullName) return '—';
        
        const names = fullName.split(' ');
        if (names.length === 1) return names[0];
        
        return `${names[1]}`;
    }

    // List animations
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        }
    }

    return (
        <div className={pageStyles.page__item}>
            <motion.div 
                className={styles.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2>{title}</h2>
            </motion.div>
            
            {/* All participants in a list */}
            <motion.div 
                className={styles.participantsList}
                variants={listVariants}
                initial="hidden"
                animate="visible"
            >
                {topUsers.map((userEl, index) => (
                    <motion.div 
                        key={userEl?.id || index} 
                        className={`${styles.participant} ${userEl?.id === user?.id ? styles.currentUser : ''} ${index === 0 ? styles.firstPlace : ''}`}
                        onClick={() => {userEl?.id ? nav(`/users/${userEl.id}`) : nav('/')}}
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className={styles.participant__place}>
                            {index + 1}
                            {index === 0 && <span className={styles.crown}>👑</span>}
                        </div>
                        <div className={styles.participant__name} title={userEl?.fullName || '—'}>
                            {formatName(userEl?.fullName)}
                        </div>
                        <div className={styles.participant__info}>
                            <span>{userEl?.booksCount || 0} <FaBook /></span>
                            <span>{userEl?.pagesCount || 0} <BiSolidSpreadsheet /></span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
});

export default TopFiveUser