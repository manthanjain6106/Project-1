import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import Newcollections from '../Components/NewCollections/Newcollections'
import NewsLatter from '../Components/NewsLatter/NewsLatter'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <Newcollections/>
      <NewsLatter/>
    </div>
  )
}

export default Shop
