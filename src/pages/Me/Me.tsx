import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Loading from "../../components/UI/Loading/Loading"
import MeInfo from "../../components/UI/Me/MeInfo"
import TopFiveBook from "../../components/UI/TopItems/TopFiveBook"
import TopFiveUser from "../../components/UI/TopItems/TopFiveUser"
import pageStyles from '../../css/page.module.css'
import useTelegram from "../../hooks/useTelegram"
import { useGetMeQuery, useLogoutMutation } from '../../services/authApi'
import { useGetClassmatesQuery, useGetMyBooksQuery, useGetTopFiveUsersQuery } from '../../services/userApi'

const Me = () => {
  const { data: authData, isLoading: authLoading } = useGetMeQuery()
  const { tgID } = useTelegram();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // RTK Query hooks
  const { data: myBooks, isLoading: booksLoading } = useGetMyBooksQuery(tgID!, { skip: !tgID });
  const { data: topFiveUsers, isLoading: topUsersLoading, refetch: refetchTopFive } = useGetTopFiveUsersQuery();
  const { data: classmates, isLoading: classmatesLoading } = useGetClassmatesQuery(tgID!, { skip: !tgID });
  const [logoutMutation] = useLogoutMutation();

  // Refetch top users on mount
  useEffect(() => {
    refetchTopFive();
  }, [refetchTopFive]);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isLoading = authLoading || booksLoading || topUsersLoading || classmatesLoading;

  if (isLoading) return <Loading />;

  if (!authData) {
    return <div>Не удалось загрузить данные пользователя</div>;
  }

  return (
    <div className={pageStyles.page__items}>
      {showLogoutConfirm ? (
        <div className={pageStyles.logoutConfirm}>
          <h6>Вы точно хотите выйти?</h6>
          <button 
            className={pageStyles.logoutButton} 
            onClick={handleLogout}
          >
            Выйти
          </button>
          <button 
            className={pageStyles.cancelButton}
            onClick={() => setShowLogoutConfirm(false)}
          >
            Отмена
          </button>
        </div>
      ) : (
        <>
          <div className={pageStyles.page__item}>
            <MeInfo me={authData} thisMe />
          </div>
          
          {myBooks && (
            <div className={pageStyles.page__item}>
              <TopFiveBook 
                currentUser={authData} 
                title="Топ 5 книг" 
                books={myBooks} 
              />
            </div>
          )}

          {topFiveUsers && (
            <div className={pageStyles.page__item}>
              <TopFiveUser 
                title="В топ 5 лицея" 
                users={topFiveUsers} 
                user={authData} 
              />
            </div>
          )}

          {classmates && classmates.length > 0 && (
            <div className={pageStyles.page__item}>
              <TopFiveUser 
                title="В топ 5 одноклассников" 
                users={classmates} 
                user={authData} 
              />
            </div>
          )}

          <button 
            className={pageStyles.logoutButton}
            onClick={() => setShowLogoutConfirm(true)}
            style={{color: 'red'}}
          >
            Выйти из аккаунта
          </button>
        </>
      )}
    </div>
  );
};

export default Me;