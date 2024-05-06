import React from 'react'
import { IconHomeFilled } from '@tabler/icons-react'

const WorkSpaceSideBar = () => {
  return (
    <div className='fixed top-0 left-0 h-screen sidebar bg-green-700 flex justify-center'>
       <a className='mt-6' href='/main'><IconHomeFilled color='white' size={40}/></a> 
    </div>
  )
}

export default WorkSpaceSideBar