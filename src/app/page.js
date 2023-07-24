"use client"
import Hero from '@/components/Hero'
import TopSelling from '@/components/TopSellling'
import ProtectedRoute from '@/utils/Context/ProtectedRoute'

import React from 'react'

const Home = () => {
  return (
    <>
      <Hero />
      <TopSelling />
    </>
  )
}

export default ProtectedRoute(Home);