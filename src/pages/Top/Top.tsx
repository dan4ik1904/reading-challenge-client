import { observer } from "mobx-react-lite";
import { FC, useEffect, useCallback } from "react";
import users from "../../stores/users";
import Loading from "../../components/UI/Loading/Loading";
import UserTopCard from "../../components/UI/UserTopCard/UserTopCard";
import itemStyles from '../../css/Item.module.css';
import countItemsInPage from "../../utils/countItemsInPage";

const Top: FC = observer(() => {
  const itemsPerPage = countItemsInPage(100, window.innerHeight);

  useEffect(() => {
    // Сбрасываем пользователей при первом рендере
    console.log(2123)
    users.resetTopUsers();
    users.page = 1; // Устанавливаем начальную страницу
    fetchUsers(); // Загружаем пользователей при монтировании
  }, []);

  const fetchUsers = async () => {
    if (users.isLoading || users.stopFetchTopUser || users.isFetching) return; // Исправлено условие
    users.isFetching = true; // Устанавливаем флаг загрузки
    try {
      await users.fetchTopUsers(users.page, itemsPerPage);
      console.log(users.topUsers)
      users.isLoadingMore = false; // Сбрасываем флаг загрузки после успешного запроса
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Произошла ошибка при загрузке пользователей.");
    } finally {
      users.isFetching = false; // Сбрасываем флаг загрузки
    }
  };

  useEffect(() => {
    fetchUsers(); // Загружаем пользователей при изменении страницы
  }, [users.page]);

  const handleScroll = useCallback(() => {
    const { innerHeight, scrollY } = window;
    const { offsetHeight } = document.documentElement;

    // Проверяем, достигли ли мы конца страницы
    if (innerHeight + scrollY + 100 >= offsetHeight && !users.isLoadingMore && !users.isFetching) {
      users.isLoadingMore = true; // Устанавливаем флаг загрузки
      users.page += 1; // Увеличиваем страницу
    }
  }, [users.isLoadingMore, users.isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (users.isLoading && users.page === 1) return <Loading />;

  return (
    <>
      <div className={itemStyles.items}>
        {users.topUsers.map((user) => (
          <UserTopCard key={user.id} user={user} />
        ))}
      </div>
      {users.isLoadingMore && <Loading isSmall />}
    </>
  );
});

export default Top;
