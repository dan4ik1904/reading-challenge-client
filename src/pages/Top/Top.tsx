import { FC, useEffect, useState } from "react"
import Loading from "../../components/UI/Loading/Loading"
import UserTopCard from "../../components/UI/UserTopCard/UserTopCard"
import itemStyles from '../../css/Item.module.css'
import { useGetTopUsersQuery } from '../../services/userApi'

const Top: FC = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // Фиксированное количество для примера
  
  const {
    data: topUsers = [],
    isLoading,
    isFetching,
    error,
  } = useGetTopUsersQuery({ page, limit: itemsPerPage });

  // Проверяем, нужно ли подгружать ещё данные
  const hasMoreData = topUsers.length === page * itemsPerPage;

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;

      // Подгружаем данные, когда пользователь близко к концу страницы
      if (scrollY + innerHeight >= scrollHeight - 200 && !isFetching && hasMoreData) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, hasMoreData]);

  if (isLoading && page === 1) return <Loading />;
  if (error) return <div>Error loading users</div>;

  return (
    <div className={itemStyles.items}>
      {topUsers.map((user) => (
        <UserTopCard key={user.id} user={user} />
      ))}
      {isFetching && <Loading isSmall />}
      {!hasMoreData && topUsers.length > 0 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          No more users to load
        </div>
      )}
    </div>
  );
};

export default Top;