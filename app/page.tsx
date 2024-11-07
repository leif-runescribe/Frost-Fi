'use client'
import React from 'react'
import Navbar from './components/Nav'
import GlassLandingPage from './components/Landing'
import FullLandingPage from './components/Base'
import InteractiveSharpTorusComponent from './components/Sphere'

const page = () => {
  return (
    <div >
      {/* <div className='absolute mt-20  top-0 left-0 w-full h-full z-[-10]'>
  <div className='fixed w-full flex justify-center'>
    <InteractiveSharpTorusComponent />
  </div>
</div> */}

      <Navbar/>
      <GlassLandingPage/>
      <FullLandingPage/>
    </div>
  )
}

export default page
