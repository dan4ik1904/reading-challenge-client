import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../../components/UI/Loading/Loading"
import MeInfo from "../../components/UI/Me/MeInfo"
import TopFiveBook from "../../components/UI/TopItems/TopFiveBook"
import TopFiveUser from "../../components/UI/TopItems/TopFiveUser"
import itemStyles from '../../css/Item.module.css'
import { useGetBooksUserQuery } from '../../services/booksApi'
import { useGetOneUserQuery, useLazyGetTopFiveUsersQuery } from '../../services/userApi'

const UserProfile = () => {
  const params = useParams();
  const userId = params.userId as string;

  // Fetch user data
  const { data: user, isLoading: userLoading } = useGetOneUserQuery(userId, { skip: !userId });
  
  // Fetch user's books
  const { data: userBooks = [], isLoading: booksLoading } = useGetBooksUserQuery(userId, { skip: !userId });
  
  // Fetch top users with manual trigger
  const [fetchTopFive, { data: topFiveUsers, isLoading: topUsersLoading }] = useLazyGetTopFiveUsersQuery();

  useEffect(() => {
    if (userId) {
      fetchTopFive();
    }
  }, [userId, fetchTopFive]);

  const isLoading = userLoading || booksLoading || topUsersLoading;

  if (isLoading) return <Loading />;
  if (!user) return null;

  return (
    <div className={itemStyles.items}>
      <MeInfo me={user} />
      <TopFiveBook 
        currentUser={user} 
        title="Топ 5 книг" 
        books={userBooks} 
      />
      {topFiveUsers && (
        <TopFiveUser 
          title="В топ 5 лицея" 
          user={user} 
          users={topFiveUsers} 
        />
      )}
    </div>
  );
};

export default UserProfile;