import React from 'react'
import Slider from '../components/Buy/carousel'
import Properties from '../components/Buy/Property'
import Discover from '../components/Buy/Discover'

const buy = ()=> {
  return (
    <div className="flex flex-col justify-between">
      
      <Slider /> 
      <Properties />
      <div className="mt-2 p-6 ">
      <Discover />
      </div>
      </div>
    
  )
}

export default buy;