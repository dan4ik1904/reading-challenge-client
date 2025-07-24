// types/telegram.d.ts
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData?: string
        initDataUnsafe?: {
          user?: {
            id: number
            first_name?: string
            last_name?: string
            username?: string
            language_code?: string
            is_premium?: boolean
            photo_url?: string
          }
          query_id?: string
          auth_date?: string
          hash?: string
        }
        version?: string
        platform?: string
        colorScheme?: 'light' | 'dark'
        themeParams?: Record<string, string>
        isExpanded?: boolean
        expand: () => void
        close: () => void
        showPopup: (params: any) => void
        onEvent: (eventType: string, handler: () => void) => void
        offEvent: (eventType: string, handler: () => void) => void
      }
    }
  }
}

export interface TelegramUser {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}