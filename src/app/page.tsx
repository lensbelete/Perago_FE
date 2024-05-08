import React from 'react'
import { Button } from '@mantine/core'

const page = () => {
  return (
    <>
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-1'>
        <div className='hero  bg-cover bg-center h-screen'>
     
      </div>
      <div className='h-screen bg-green-50 flex justify-center items-center'>
        <div>
        <article>
          <h1  className='green_gradient'>Perago</h1>
          <p className='green_gradient'>Work with Ease</p>
          <a href='/main'><Button color='green' className='green_gradient' >Get Started</Button></a>      
       </article>
        </div>
       
      </div>
      
    </div>
   
    </>
    
    
  )
}

export default page