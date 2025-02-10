import { useState, useEffect, FC } from "react";
import styles from './Loading.module.css'

const Loading: FC<{isSmall?: boolean}> = ({ isSmall }) => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots + 1) % 4);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${isSmall ? styles.small : ''} ${styles.loading}`}>
      <div className={styles.dots}>
        {Array.from({ length: dots }).map((_, i) => (
          <div key={i} className={styles.dot}></div>
        ))}
      </div>
    </div>
  );
};

export default Loading