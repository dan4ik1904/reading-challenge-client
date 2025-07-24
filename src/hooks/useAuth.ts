import { useEffect } from 'react'
import { useGetMeQuery } from '../services/authApi'
import { selectTelegramUserId } from '../services/telegramSlice'
import { useAppSelector } from './useRedux'

const useAuth = () => {
  const tgID = useAppSelector(selectTelegramUserId)
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useGetMeQuery(undefined, {
    skip: !tgID
  })

  useEffect(() => {
    if (tgID) {
      refetch()
    }
  }, [tgID, refetch])

  return {
    user: data,
    isAuthenticated: !isError && !!data,
    isLoading: isLoading || !tgID,
    isError,
    error,
    refetchAuth: refetch,
    tgID
  }
}

export default useAuth