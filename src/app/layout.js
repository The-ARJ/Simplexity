"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })
import { ThemeProvider } from "@material-tailwind/react";
import { CommonProvider } from '@/utils/Context/CommonProvider';
import Provider from '../utils/Context/Provider'
export const metadata = {
  title: 'Simplexity',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>

          <CommonProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
            <ToastContainer />

          </CommonProvider>

        </Provider>
      </body>
    </html>
  )
}
