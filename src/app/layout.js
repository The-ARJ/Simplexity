"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })
import ComplexNavbar from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { Provider } from 'react-redux';
import store from '@/utils/Redux/Store';

export const metadata = {
  title: 'Simplexity',
  description: 'Out Door Wears',
  icons: {
    icon: '/assets/hoodie.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ComplexNavbar />
          {children}
          <Footer />
          <ToastContainer />
        </Provider>
      </body>
    </html>
  )
}
