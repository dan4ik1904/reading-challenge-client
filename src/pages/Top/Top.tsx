import { FC, useCallback, useEffect, useState } from "react"
import Loading from "../../components/UI/Loading/Loading"
import UserTopCard from "../../components/UI/UserTopCard/UserTopCard"
import itemStyles from '../../css/Item.module.css'
import { useGetTopUsersQuery } from '../../services/userApi'
import { IUser } from '../../types/user.interface'
import countItemsInPage from "../../utils/countItemsInPage"

const Top: FC = () => {
  const itemsPerPage = countItemsInPage(100, window.innerHeight)
  const [page, setPage] = useState(1)
  const [allUsers, setAllUsers] = useState<IUser[]>([]) // Добавляем локальное хранилище пользователей
  const [hasMore, setHasMore] = useState(true) // Переименовываем для ясности
  
  const {
    data: newUsers = [],
    isLoading,
    isFetching,
    error,
  } = useGetTopUsersQuery(
    { page, limit: itemsPerPage },
    { skip: !hasMore }
  )

  // Объединяем полученных пользователей
  useEffect(() => {
    if (newUsers.length > 0) {
      setAllUsers(prev => [...prev, ...newUsers])
      // Проверяем, есть ли еще данные для загрузки
      if (newUsers.length < itemsPerPage * page) {
        setHasMore(false)
      }
    }
  }, [newUsers, itemsPerPage])

  const fetchMoreUsers = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage(prev => prev + 1)
    }
  }, [isFetching, hasMore])

  const handleScroll = useCallback(() => {
    const { innerHeight, scrollY } = window
    const { offsetHeight } = document.documentElement

    if (innerHeight + scrollY + 100 >= offsetHeight) {
      fetchMoreUsers()
    }
  }, [fetchMoreUsers])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      // Не сбрасываем page и hasMore при размонтировании
      // чтобы сохранить позицию при возвращении
    }
  }, [handleScroll])

  // Сбрасываем состояние только при полной перезагрузке страницы
  useEffect(() => {
    return () => {
      setAllUsers([])
      setPage(1)
      setHasMore(true)
    }
  }, [])

  if (isLoading && page === 1) return <Loading />
  if (error) return <div>Error loading users</div>

  return (
    <>
      <div className={itemStyles.items}>
        {allUsers.map((user) => (
          <UserTopCard key={user.id} user={user} />
        ))}
      </div>
      {isFetching && <Loading isSmall />}
      {!hasMore && allUsers.length > 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: '#666'
        }}>
          Вы достигли конца списка
        </div>
      )}
    </>
  )
}

export default Top