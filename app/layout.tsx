import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vocalshare',
  description: 'Your favourite music app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider> {/* this is where the supabase provider goes and we now have access to the client supabase inside our application */}
        <Sidebar>
          {children} {/* this is where the main content goes */}
        </Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  )
}
