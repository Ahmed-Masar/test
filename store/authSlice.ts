import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { User, AuthError } from '@/lib/types'
import { authAPI } from '@/lib/api'
import { getTokenStorage, setToken, getToken, removeToken, clearAllTokens, setUser, getUser as getStoredUser } from '@/lib/storage'

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const getInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    }
  }

  const accessToken = getToken('accessToken')
  const refreshToken = getToken('refreshToken')
  const userStr = getStoredUser()
  let user: User | null = null

  if (userStr) {
    try {
      user = JSON.parse(userStr) as User
    } catch {
      user = null
    }
  }

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!(accessToken && user),
    isLoading: false,
    error: null,
  }
}

const initialState: AuthState = getInitialState()

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (
    { email, password, rememberMe }: { email: string; password: string; rememberMe: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await authAPI.login(email, password)
      return { ...response, rememberMe }
    } catch (error: unknown) {
      const err = error as { response?: { data?: AuthError } }
      return rejectWithValue(
        err.response?.data?.message || 'Login failed'
      )
    }
  }
)

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await authAPI.logout()
})

export const getCurrentUserAsync = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authAPI.getCurrentUser()
      return user
    } catch (error: unknown) {
      const err = error as { response?: { data?: AuthError } }
      return rejectWithValue(
        err.response?.data?.message || 'Failed to get user'
      )
    }
  }
)

export const refreshTokenAsync = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState }
      const refreshToken = state.auth.refreshToken

      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await authAPI.refreshToken(refreshToken)
      return response
    } catch (error: unknown) {
      const err = error as { response?: { data?: AuthError } }
      return rejectWithValue(
        err.response?.data?.message || 'Token refresh failed'
      )
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; user: User; rememberMe: boolean }>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
      state.isAuthenticated = true
      state.error = null

      setToken('accessToken', action.payload.accessToken, action.payload.rememberMe)
      setToken('refreshToken', action.payload.refreshToken, action.payload.rememberMe)
      setUser(action.payload.user, action.payload.rememberMe)
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
      const rememberMe = typeof window !== 'undefined' && localStorage.getItem('rememberMe') === 'true'
      setToken('accessToken', action.payload, rememberMe)
    },
    clearAuth: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.error = null

      clearAllTokens()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.user = action.payload.user
        state.error = null

        setToken('accessToken', action.payload.accessToken, action.payload.rememberMe)
        setToken('refreshToken', action.payload.refreshToken, action.payload.rememberMe)
        setUser(action.payload.user, action.payload.rememberMe)
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.error = action.payload as string
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        state.isAuthenticated = false
        state.error = null

        clearAllTokens()
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(getCurrentUserAsync.rejected, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
        const rememberMe = typeof window !== 'undefined' && localStorage.getItem('rememberMe') === 'true'
        setToken('accessToken', action.payload.accessToken, rememberMe)
      })
      .addCase(refreshTokenAsync.rejected, (state) => {
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        state.isAuthenticated = false
        clearAllTokens()
      })
  },
})

export const { clearError, setCredentials, updateAccessToken, clearAuth } = authSlice.actions
export default authSlice.reducer

