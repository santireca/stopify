import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Figtree } from 'next/font/google'
import SupabaseProviders from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Stopify',
  description: 'Listen to music',
}

export const revalidate = 0;

export default async function RootLayout({ children } : {
  children: React.ReactNode
}) {

  const userSongs = await getSongsByUserId()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProviders>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs = {userSongs}>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProviders>
      </body>
    </html>
  )
}
