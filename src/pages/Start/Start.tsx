import { useNavigate } from 'react-router-dom'
import styles from './Start.module.css'

const Start = () => {

	const nav = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img 
            src="./startMan.png" 
            alt="Мальчик"
            className={styles.image}
          />
        </div>
        
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Привет!</h1>
          <p className={styles.description}>
            Добро пожаловать в наше приложение. Здесь ты сможешь найти интересные книги, 
            посмотреть рейтинги своих одноклассников и многое другое!
          </p>
        </div>
      </div>
      
      <button 
        onClick={() => nav('/auth')}
        className={styles.button}
      >
        Начать
      </button>
    </div>
  );
};

export default Start;