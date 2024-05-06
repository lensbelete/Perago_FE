"use client"
import React from 'react'
import WorkSpaceSideBar from '@/components/WorkSpaceSideBar'
import { useParams} from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import { IconTable, IconPlus, IconFile, IconChevronDown } from '@tabler/icons-react'
import { Button,Menu, Drawer, Table, Input} from '@mantine/core'
import { useSelector } from 'react-redux'
import CreateTableDrawer from '@/components/CreateTableDrawer'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

const page = () => {
    const {id} = useParams()
    const [opened, { open, close }] = useDisclosure(false);
    const projectId = Number(id)
    const project = useSelector((store) => store.workSpaces.projects.find((project) => project.id === projectId));

    const tables = project?.tables

    const [columns, setColumn] = useState([])


    const handleButtonClick = (event) => {
       
        const buttonId = event.currentTarget.id;
        const tableId = Number(buttonId)  
        console.log(typeof(tableId))
        console.log(`Button with ID ${tableId} was clicked`);
        const table = tables.find((table) => table.id === tableId)

        const newColumn = table?.columns
        setColumn(newColumn)
      
    
      };
   
      console.log(columns)
  return (
    <div className='grid-cols-custom'>

        <div className='h-screen bg-green-900 border border-r-2'>
            <WorkSpaceSideBar/>
            
        </div>

        <div className='h-screen bg-gray-200 border-r-2 border-white'>
            <div className='border border-b-2 border-b-white h-14'>
                <p className='p-3 text-3x1 font-semibold text-green-700'>Table Editor</p>
            </div>

            <div className='justify-center'>
                <SearchBar />
                <div className='flex justify-center border border-r-2 border-b-white'>
                    <Drawer
                        opened={opened} onClose={close}
                        position='right'
                        size="40rem"
                        title="Create a new table"
                        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                    >
                        <CreateTableDrawer isOpen={open} onClose={close} projectId={projectId}/>  
                    </Drawer>
                    <Button className="mb-4" leftSection={<IconPlus size={14}/>}color='green' size='xs' onClick={open}>New Table</Button>
                </div>



                <div className='grid-cols-1'>
                {tables?.length > 0 && (
  <div>
    {tables.map((table) => (
      table && ( // Check if table is not undefined before accessing id
        <Button
          justify="left"
          fullWidth
          color="green"
          leftSection={<IconTable />}
          variant="transparent"
          key={table.id}
          onClick={handleButtonClick}
          id={table.id}
        >
          {table.name}
        </Button>
      )
    ))}
  </div>
)}

                </div>
                


            
            </div>
        </div>







        <div className='h-screen'>
            {/* we will write the colomun code here */}

           <div className='relative h-14 bg-gray-200 border-b-2 border-white'>
            <div className='absolute right-2 top-2'>
                <Button color='green'>Generate Code</Button>

            </div>
           
           </div>
           <div>
           {columns && (
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                <tr> 
                    {columns.map((column, index) => (
                    <Table.Th key={column.id}>
                        <span>{column.name}</span>
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Button variant='transparent'><IconChevronDown /></Button>
                            </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label></Menu.Label>
                            <Menu.Item>type: {column.type}</Menu.Item>
                            <Menu.Item>default value: {column.default_value}</Menu.Item>
                            <Menu.Item>primary key: {column.is_primarykey}</Menu.Item>
                        </Menu.Dropdown>
                     </Menu>
                    </Table.Th>
                    ))}
                    
                    {columns.length > 0 && (
                    <Table.Th key="addButton">
                        <Button color="green" size='xs' variant='transparent'>
                        <IconPlus />
                        </Button>
                    </Table.Th>
                                )}
                            </tr>
                </Table.Thead>
            </Table>
            )}
                    
            

            </div>


        </div>
    
    </div>
  )
}

export default page