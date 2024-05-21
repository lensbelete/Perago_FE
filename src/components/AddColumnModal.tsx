import React from "react";
import { TextInput, Button, Checkbox, Modal } from "@mantine/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

import { createColumnAPI } from "@/services/columnService";
import { useColumnStore } from "@/zustandStore/columnStore";

const AddColumnModal = ({
  projectId,
  id,
}: {
  projectId: string;
  id: string;
}) => {
  const tableId = id;
  const [opened, { open, close }] = useDisclosure(false);
  const { addColumn } = useColumnStore();

  const schema = yup.object({
    name: yup.string().required(),
    type: yup.string(),
    default_value: yup.string(),
    is_primarykey: yup.boolean(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    const columnData = {
      name: data.name,
      type: data.type as string,
      isPrimary: data.is_primarykey as boolean,
      isForiegn: false,
    };

    try {
      const response = await createColumnAPI(tableId, columnData);
      console.log(response.data);
      addColumn(response.data);
      close();
    } catch (error) {
      alert("Couldn't add the column to the table");
      close();
    }
  };

  return (
    <>
      <Button onClick={open} color="green" size="xs" variant="transparent">
        <IconPlus />
      </Button>
      <Modal opened={opened} onClose={close} title="Add Column">
        <div>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              placeholder="Name"
              {...register("name")}
              error={errors.name?.message}
              className={errors.name ? "error-input" : ""}
            />
            <TextInput placeholder="type" {...register("type")} />
            <TextInput
              placeholder="default value"
              {...register("default_value")}
            />
            <Checkbox placeholder="pk" {...register("is_primarykey")} />
            <Button color="green" type="submit">
              Create
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddColumnModal;
