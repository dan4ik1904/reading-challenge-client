import { useEffect, useRef, useState } from 'react'
import { initTelegram, setError, setExpanded } from '../services/telegramSlice'
import { useAppDispatch } from './useRedux'

const useTelegram = () => {
  const dispatch = useAppDispatch()
  const tgRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isWebApp = typeof window !== 'undefined' && !!window.Telegram?.WebApp

  useEffect(() => {
    if (isWebApp && window.Telegram?.WebApp) {
      try {
        const tg = window.Telegram.WebApp
        tgRef.current = tg
        
        dispatch(initTelegram({
          initData: tg.initDataUnsafe || {},
          themeParams: tg.themeParams || {}
        }))
        
        tg.expand()
        dispatch(setExpanded(true))
        
        tg.onEvent('themeChanged', () => {
          // Логика обработки изменения темы
        })

        setIsLoading(false)
      } catch (err) {
        dispatch(setError('Failed to initialize Telegram WebApp'))
        console.error('Telegram WebApp init error:', err)
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [dispatch, isWebApp])

  return {
    // Методы
    expandWebApp: () => {
      tgRef.current?.expand()
      dispatch(setExpanded(true))
    },
    closeWebApp: () => tgRef.current?.close(),
    showPopup: (params: any) => tgRef.current?.showPopup(params),
    
    // Данные
    tgID: window.Telegram?.WebApp?.initDataUnsafe?.user?.id,
    themeParams: window.Telegram?.WebApp?.themeParams || {},
    user: window.Telegram?.WebApp?.initDataUnsafe?.user,
    
    // Состояния
    isWebApp,
    isExpanded: window.Telegram?.WebApp?.isExpanded || false,
    isLoading, // Добавляем isLoading в возвращаемые значения
    
    // Для сложных случаев
    getWebApp: () => tgRef.current
  }
}

export default useTelegram