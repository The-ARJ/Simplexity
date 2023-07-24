"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })
import { ThemeProvider } from "@material-tailwind/react";
import { CommonProvider } from '@/utils/Context/CommonProvider';
import Provider from '../utils/Context/Provider'
import ComplexNavbar from '@/components/Header/Header';
import Footer from '@/components/Footer';

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
        <Provider>
          <CommonProvider>
            <ThemeProvider>
              <ComplexNavbar />
              {children}
              <Footer />
            </ThemeProvider>
            <ToastContainer />
          </CommonProvider>
        </Provider>
      </body>
    </html>
  )
}
