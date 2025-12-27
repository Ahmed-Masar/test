const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  REMEMBER_ME: 'rememberMe',
} as const

export const getStorage = (rememberMe: boolean): Storage => {
  if (typeof window === 'undefined') {
    return {} as Storage
  }
  return rememberMe ? localStorage : sessionStorage
}

export const getTokenStorage = (): Storage => {
  if (typeof window === 'undefined') {
    return {} as Storage
  }
  const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true'
  return rememberMe ? localStorage : sessionStorage
}

export const setToken = (key: string, value: string, rememberMe: boolean): void => {
  if (typeof window === 'undefined') return
  
  const storage = getStorage(rememberMe)
  storage.setItem(key, value)
  
  if (rememberMe) {
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true')
  } else {
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME)
  }
}

export const getToken = (key: string): string | null => {
  if (typeof window === 'undefined') return null
  
  const storage = getTokenStorage()
  return storage.getItem(key)
}

export const removeToken = (key: string): void => {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem(key)
  sessionStorage.removeItem(key)
}

export const clearAllTokens = (): void => {
  if (typeof window === 'undefined') return
  
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  })
}

export const setUser = (user: unknown, rememberMe: boolean): void => {
  if (typeof window === 'undefined') return
  
  const storage = getStorage(rememberMe)
  storage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export const getUser = (): string | null => {
  if (typeof window === 'undefined') return null
  
  const storage = getTokenStorage()
  return storage.getItem(STORAGE_KEYS.USER)
}

