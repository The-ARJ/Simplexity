import Hero from '@/components/Hero'
import TopSelling from '@/components/TopSellling'

import React from 'react'
import getProducts from "@/lib/getAllProducts";

const Home = ({ searchParams }) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const promise = getProducts({ page, limit, query: search });
  return (
    <>
      <Hero />
      <TopSelling promise={promise} />
    </>
  )
}

export default Home;