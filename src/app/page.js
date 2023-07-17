"use client"
import Footer from '@/components/Footer'
import ComplexNavbar from '@/components/Header/Header'
import Hero from '@/components/Hero'
import TopSelling from '@/components/TopSellling'

export default function Home() {
  return (
    <>
      <ComplexNavbar />
      <Hero />
      <TopSelling />
      <Footer />
    </>
  )
}
