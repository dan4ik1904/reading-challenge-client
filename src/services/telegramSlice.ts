import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TelegramUser {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

interface TelegramInitData {
  user?: TelegramUser
  query_id?: string
  auth_date?: string
  hash?: string
}

interface TelegramThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
}

interface TelegramState {
  initData: TelegramInitData | null
  themeParams: TelegramThemeParams | null
  loading: boolean
  error: string | null
  isExpanded: boolean
}

const initialState: TelegramState = {
  initData: null,
  themeParams: null,
  loading: false,
  error: null,
  isExpanded: false
}

export const telegramSlice = createSlice({
  name: 'telegram',
  initialState,
  reducers: {
    initTelegram: (state, action: PayloadAction<{
      initData: TelegramInitData
      themeParams: TelegramThemeParams
    }>) => {
      state.initData = action.payload.initData
      state.themeParams = action.payload.themeParams
      state.loading = false
      state.isExpanded = true
    },
    setTelegramUser: (state, action: PayloadAction<TelegramUser>) => {
      if (state.initData) {
        state.initData.user = action.payload
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setExpanded: (state, action: PayloadAction<boolean>) => {
      state.isExpanded = action.payload
    },
    resetTelegram: () => initialState
  }
})

// Селекторы
export const selectTelegramInitData = (state: { telegram: TelegramState }) => state.telegram.initData
export const selectTelegramUser = (state: { telegram: TelegramState }) => state.telegram.initData?.user
export const selectTelegramUserId = (state: { telegram: TelegramState }) => state.telegram.initData?.user?.id
export const selectTelegramThemeParams = (state: { telegram: TelegramState }) => state.telegram.themeParams
export const selectTelegramLoading = (state: { telegram: TelegramState }) => state.telegram.loading
export const selectTelegramError = (state: { telegram: TelegramState }) => state.telegram.error
export const selectTelegramIsExpanded = (state: { telegram: TelegramState }) => state.telegram.isExpanded

export const { 
  initTelegram, 
  setTelegramUser, 
  setLoading, 
  setError, 
  setExpanded,
  resetTelegram 
} = telegramSlice.actions

export default telegramSlice.reducer