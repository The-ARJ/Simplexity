"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })
import ComplexNavbar from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { Provider } from 'react-redux';
import store, { persistor } from '@/utils/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

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
          <PersistGate loading={null} persistor={persistor}>
            <ComplexNavbar />
            {children}
            <Footer />
            <ToastContainer />
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
