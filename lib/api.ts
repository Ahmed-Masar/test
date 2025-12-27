import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import type { LoginResponse, RefreshTokenResponse, AuthError } from './types'
import { getToken, clearAllTokens, setToken } from './storage'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const accessToken = getToken('accessToken')
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<AuthError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = getToken('refreshToken')

      if (!refreshToken) {
        processQueue(error, null)
        if (typeof window !== 'undefined') {
          clearAllTokens()
          window.location.href = '/'
        }
        return Promise.reject(error)
      }

      try {
        const response = await axios.post<RefreshTokenResponse>(
          `${API_BASE_URL}/api/auth/refresh`,
          { refreshToken }
        )

        const { accessToken } = response.data

        const rememberMe = typeof window !== 'undefined' && localStorage.getItem('rememberMe') === 'true'
        setToken('accessToken', accessToken, rememberMe)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
        }

        processQueue(null, accessToken)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null)
        if (typeof window !== 'undefined') {
          clearAllTokens()
          window.location.href = '/'
        }
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/auth/login', { email, password })
    return response.data
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  getCurrentUser: async () => {
    const response = await api.get<{ user: User }>('/api/auth/me')
    return response.data.user
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>('/api/auth/refresh', { refreshToken })
    return response.data
  },
}

export default api

