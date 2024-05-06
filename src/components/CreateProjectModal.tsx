import React from 'react'

import { Button, TextInput} from '@mantine/core';
import { useForm} from 'react-hook-form';
import *  as yup from "yup";
import { useDispatch } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup";
import { createProject } from '@/slices/workSpaceSlice';
import { v4  } from 'uuid';

const CreateProjectModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const schema = yup.object({
        name : yup.string().required(),
        description: yup.string()
    })
    

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    


    const onSubmit = async (data) => {
        const id = v4();
        const newProject = {
            id,
            name : data.name,
            description : data.description,
            tables : []
        }
        dispatch(createProject(newProject))
        console.log(newProject.id)
        onClose()
        
    };


  return (
   <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <TextInput placeholder='Project Name' {...register("name")}
        error={errors.name?.message}
        className={errors.name ? 'error-input' : ''} />
        <TextInput placeholder='Description' {...register("description")}/>
        <Button color="green" type='submit'>Create</Button>
    </form>


    
  )
}

export default CreateProjectModal


