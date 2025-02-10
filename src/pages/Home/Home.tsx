import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useTelegram from "../../hooks/useTelegram";
import InfoLitsey from "../../components/UI/InfoListsey/InfoListsey";
import users from "../../stores/users";
import Loading from "../../components/UI/Loading/Loading";
import TopFiveUser from "../../components/UI/TopItems/TopFiveUser";
import pageStyles from '../../css/page.module.css'


const Home: FC = observer(() => {
  const { tgID } = useTelegram();
  const { isAuthenticated, loading, data } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      await users.resetTopFiveUsers();
      await users.fetchTopFiveUsers();
      if (tgID) await users.fetchClassmaets(tgID);
    };

    fetchData();
  }, [tgID]);

  if(users.isLoading || loading) return <Loading />
  return (
    <div className={pageStyles.page__items}>
      <InfoLitsey />
      {users.topFiveUsers && <TopFiveUser user={data} title="Топ лицея" users={users.topFiveUsers} />}
      {isAuthenticated && users.classmates && <TopFiveUser user={data} title={"Топ класса"} users={users.classmates} />}
    </div>
  );
});

export default Home;

