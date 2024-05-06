import React from 'react'

import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react';

const SearchBar = () => {
  return (
    <div className="search-bar flex items-center rounded-md px-3 py-2">
        <TextInput  
            type="text" placeholder="Search..." 
            className="w-64 outline-green"/>
        <button type="submit" className="ml-2 p-2 text-gray-500 hover:text-blue-500">
            <IconSearch color='white'/>
        </button>

</div>
  )
}

export default SearchBar