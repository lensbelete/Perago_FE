"use client"
import React, { useEffect } from 'react'
import WorkSpaceSideBar from '@/components/WorkSpaceSideBar'
import { useParams} from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import { IconTable,IconChevronDown, IconDownload } from '@tabler/icons-react'
import { Button,Menu,Table} from '@mantine/core'
import { useSelector } from 'react-redux'
import CreateTableDrawer from '@/components/CreateTableDrawer'
import { useState } from 'react'
import AddColumnModal from '@/components/AddColumnModal'

const Page = () => {
    const {id} = useParams()
    

    const projectId = id


    const project = useSelector((store) => store.workSpaces.projects.find((project) => project.id === projectId));

    const [tableId, setTableId] = useState()
    const [columns, setColumn] = useState([])

    const tables = project?.tables

    useEffect(() => {
        console.log('Tables have updated:', tables);
    }, [tables]);

    
    useEffect(() => {
        if (tableId) {
            const currentTable = tables.find(t => t.id === tableId);
            if (currentTable) {
                setColumn(currentTable.columns);
            }
        }
    }, [tables, tableId]);


   


    const handleButtonClick = (event) => {
       
        const buttonId = event.currentTarget.id;
        const tableId = buttonId 
        
        console.log(`Button with ID ${tableId} was clicked`);
        const table = tables.find((table) => table.id == tableId)

        const newColumn = table?.columns
        console.log(newColumn)
        setColumn(newColumn)
        console.log(newColumn)
        setTableId(tableId)
      
    
      };
    useEffect(() => {
        
      }, [tables]);
    useEffect(() => {
    }, [columns]);
   
    //   console.log(columns)
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

                    <CreateTableDrawer projectId={projectId}/>  
                   
                </div>



                <div className='grid-cols-1'>
                {tables?.length > 0 && (
  <div>
    {tables.map((table) => (
      table && (
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
                <Button rightSection={<IconDownload/>} variant='transparent' color='green'>Generate Code</Button>

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
                                <Button variant='transparent'><IconChevronDown color='green' size={20}/></Button>
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
                        <div>
                       
                    <Table.Th key="addButton">
                        <AddColumnModal projectId={projectId} id={tableId}/>
                    </Table.Th>
                        </div>
                        
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

export default Page