"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })
import { ThemeProvider } from "@material-tailwind/react";
import { CommonProvider } from '@/utils/Context/CommonProvider';
import ComplexNavbar from '@/components/Header/Header';
import Footer from '@/components/Footer';
import ReduxProvider from '@/utils/Redux/Provider';

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
        <CommonProvider>
            <ComplexNavbar />
            {children}
            <Footer />
          <ToastContainer />
        </CommonProvider>
      </body>
    </html>
  )
}
