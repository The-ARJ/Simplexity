import './globals.css'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })
import ComplexNavbar from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/utils/Redux/Provider';

export const metadata = {
  title: 'Simplexity - Similify, Shop, Smile',
  description: 'Out Door Wears',
  icons: {
    icon: '/assets/hoodie.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ComplexNavbar />
          {children}
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
