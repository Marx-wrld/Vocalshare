import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import ModalProvider from '@/providers/ModalProvider'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vocalshare',
  description: 'Your favourite music app',
}

export const revalidate = 0; //we don't want this layout to be cached

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) { 
  
  const userSongs = await getSongsByUserId(); //Now that we have these user songs we'll pass them to our sidebar, which will provide them to our library
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider> {/* this is where the supabase provider goes and we now have access to the client supabase inside our application */}
        <UserProvider> {/*this is where the user provider goes and we now have access to the user inside our application*/}
        <ModalProvider />
        <Sidebar songs={userSongs}>
          {children} {/* this is where the main content goes */}
        </Sidebar>
        <Player />
        </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
};
