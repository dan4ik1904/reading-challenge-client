import { FC, useEffect } from "react"
import InfoLitsey from "../../components/UI/InfoListsey/InfoListsey"
import Loading from "../../components/UI/Loading/Loading"
import TopFiveUser from "../../components/UI/TopItems/TopFiveUser"
import pageStyles from '../../css/page.module.css'
import useAuth from "../../hooks/useAuth"
import useTelegram from "../../hooks/useTelegram"
import { useGetClassmatesQuery, useGetTopFiveUsersQuery } from '../../services/userApi'

const Home: FC = () => {
  const { tgID } = useTelegram();
  const { isAuthenticated, isLoading: authLoading, user: authData } = useAuth();

  // Запросы данных
  const { 
    data: topFiveUsers, 
    isLoading: topLoading,
    refetch: refetchTopFive
  } = useGetTopFiveUsersQuery();
  
  const { 
    data: classmates, 
    isLoading: classmatesLoading,
    isFetching: classmatesFetching
  } = useGetClassmatesQuery(tgID!, { skip: !tgID });

  // Сброс и обновление данных при изменении tgID
  useEffect(() => {
    if (tgID) {
      refetchTopFive();
    }
  }, [tgID, refetchTopFive]);

  if (topLoading || classmatesLoading || authLoading) return <Loading />;

  return (
    <div className={pageStyles.page__items}>
      <InfoLitsey />
      <div className={pageStyles.page__item}>
        {topFiveUsers && authData && (
          <TopFiveUser 
            user={authData} 
            title="Топ лицея" 
            users={topFiveUsers} 
          />
        )}
      </div>
      <div className={pageStyles.page__item}>
        {isAuthenticated && classmates && authData && (
          <TopFiveUser 
            user={authData} 
            title="Топ класса" 
            users={classmates} 
          />
        )}
      </div>
        
      
      
    </div>
  );
};

export default Home;