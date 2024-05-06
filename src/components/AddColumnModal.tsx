import React from 'react'
import { TextInput, Button, Checkbox, Modal } from '@mantine/core'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import {v4} from "uuid"
import { useDispatch } from 'react-redux';
import { createColumn } from '@/slices/workSpaceSlice';

const AddColumnModal = ({projectId, id}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch =useDispatch()
    
   
    const schema = yup.object({
        name : yup.string().required(),
        type: yup.string(),
        default_value: yup.string(),
        is_primarykey: yup.boolean()
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    
    
    const onSubmit = async (data) => {
        const id = v4();
        const newColumn = {
            id,
            name : data.name,
            type: data.type,
            default_value: data.default_value,
            is_primarykey: data.is_primarykey
        }
        console.log(newColumn)
        dispatch(createColumn({newColumn, projectId, id}))
       
        close()
        
    };
    
  return (
    <>
     <Button onClick={open} color="green" size="xs" variant="transparent">
        <IconPlus />
      </Button>
     <Modal opened={opened} onClose={close} title="Add Column">
     <div>
         <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <TextInput placeholder='Name' {...register("name")}
        error={errors.name?.message}
        className={errors.name ? 'error-input' : ''} />
        <TextInput placeholder='type' {...register("type")}/>
        <TextInput placeholder='default value' {...register("default_value")}/>
        <Checkbox placeholder='pk' {...register("is_primarykey")}/>
        <Button color="green" type='submit'>Create</Button>
    </form>
        
    </div>
    </Modal> 
    </>
   
  )
}

export default AddColumnModal