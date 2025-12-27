export type UserRole = 'admin' | 'user' | 'viewer'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
  expiresIn: number
}

export interface RefreshTokenResponse {
  accessToken: string
  expiresIn: number
}

export interface AuthError {
  message: string
  error: string
  details?: unknown
}

