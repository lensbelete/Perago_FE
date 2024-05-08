import React from 'react'

import { NavLink,Button } from '@mantine/core'
import {useSelector} from 'react-redux'
import { IconChevronRight, IconFolder } from '@tabler/icons-react'


const SideBar = () => {


  const {projects} = useSelector((store) => store.workSpaces)
  return (
    <div className='fixed top-0 left-0 h-screen w-56 bg-gray-100 grid-cols-1 border border-r-2 border-white'>
      <div className='flex justify-start p-3  h-24 mt-5'>
        <p className='head_text'><span className='bg-green-500 font-bold text-white italic  
        pr-3 pl-1.5 rounded-lg mr-1'>P</span>
        erago</p>
      </div>


      <div className='mt-10 '>
        <NavLink  defaultOpened leftSection = {<IconFolder/>} label="Projects" childrenOffset={28}>
          {projects && projects.map((project)=>
          <NavLink leftSection={<IconFolder size={16}/>} rightSection={<IconChevronRight size={14}/>} key={project.id} label={project.name} href={`/workSpace/${project.id}`}/> 
        )}
        </NavLink>
      </div>

      <div className='flex justify-center absolute bottom-4 left-4'>
        <Button color='green'>Generate Code</Button>
      </div>

    </div>
  )
}

export default SideBar