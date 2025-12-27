import type { Metadata } from 'next'
import './globals.css'
import ReduxProvider from '@/components/ReduxProvider'

export const metadata: Metadata = {
  title: 'Vodex OS',
  description: 'Vodex OS Login',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}

