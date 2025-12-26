'use client'

import Login from '@/components/Login'

export default function Home() {
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

