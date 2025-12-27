'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { getCurrentUserAsync } from '@/store/authSlice'
import { useAppDispatch } from '@/store/hooks'
import { getToken } from '@/lib/storage'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'user' | 'viewer'
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth)
  const isCheckingRef = useRef(false)
  const hasRedirectedRef = useRef(false)

  useEffect(() => {
    if (hasRedirectedRef.current || isCheckingRef.current) {
      return
    }

    const checkAuth = async () => {
      if (typeof window === 'undefined') return

      isCheckingRef.current = true

      const accessToken = getToken('accessToken')

      if (!accessToken) {
        if (!hasRedirectedRef.current) {
          hasRedirectedRef.current = true
          router.replace('/')
        }
        isCheckingRef.current = false
        return
      }

      if (!isAuthenticated && !isLoading) {
        try {
          await dispatch(getCurrentUserAsync()).unwrap()
        } catch {
          if (!hasRedirectedRef.current) {
            hasRedirectedRef.current = true
            router.replace('/')
          }
        }
      }

      isCheckingRef.current = false
    }

    checkAuth()
  }, [isAuthenticated, isLoading, router, dispatch])

  useEffect(() => {
    if (hasRedirectedRef.current) {
      return
    }

    if (isAuthenticated && user && requiredRole) {
      if (user.role !== requiredRole && user.role !== 'admin') {
        hasRedirectedRef.current = true
        router.replace('/dashboard')
      }
    }
  }, [isAuthenticated, user, requiredRole, router])

  if (isLoading || isCheckingRef.current) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{
          background: 'linear-gradient(180deg, #141414 0%, #0E0E0E 100%)',
        }}
      >
        <div
          style={{
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '14px',
            color: '#FAFAFA',
          }}
        >
          Loading...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && user && user.role !== requiredRole && user.role !== 'admin') {
    return null
  }

  return <>{children}</>
}

