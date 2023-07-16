"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })
import { ThemeProvider } from "@material-tailwind/react";

export const metadata = {
  title: 'Simplexity',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
