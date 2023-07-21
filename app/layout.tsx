import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModelProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'

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
        <ToasterProvider />
        <SupabaseProvider> {/* this is where the supabase provider goes and we now have access to the client supabase inside our application */}
        <UserProvider> {/*this is where the user provider goes and we now have access to the user inside our application*/}
        <ModelProvider />
        <Sidebar>
          {children} {/* this is where the main content goes */}
        </Sidebar>
        </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
