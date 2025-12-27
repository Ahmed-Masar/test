'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { getCurrentUserAsync } from '@/store/authSlice'
import { useAppDispatch } from '@/store/hooks'
import { getToken } from '@/lib/storage'
import Login from '@/components/Login'

export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      if (typeof window === 'undefined') return

      const accessToken = getToken('accessToken')

      if (!accessToken) {
        return
      }

      if (!isAuthenticated && !isLoading) {
        try {
          await dispatch(getCurrentUserAsync()).unwrap()
        } catch {
          return
        }
      }
    }

    checkAuthAndRedirect()
  }, [dispatch, isAuthenticated, isLoading])

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  if (isAuthenticated) {
    return null
  }

  return (
    <main 
      className="w-full h-screen flex flex-col items-center justify-end"
      style={{
        background: 'linear-gradient(180deg, #141414 0%, #0E0E0E 100%)',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <Login />
    </main>
  )
}

