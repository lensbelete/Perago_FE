import React, { useState } from "react";

import { Button, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 } from "uuid";

import useProjectStore from "@/zustandStore/projectStore";
import { createProjectAPI } from "@/services/projectService";

const CreateProjectModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => Promise<void>;
}) => {
  // const dispatch = useDispatch();

  const { addProject } = useProjectStore();

  const schema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    const projectData = {
      name: data.name,
      description: data.description,
    };

    try {
      const apiResult = await createProjectAPI(projectData);
      addProject(apiResult.data);
      console.log(apiResult.data.id);
      onClose();
    } catch (error) {
      alert(
        "Couldn't create the project because there is another with the same name"
      );
      onClose();
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder="Project Name"
        {...register("name")}
        error={errors.name?.message}
        className={errors.name ? "error-input" : ""}
      />
      <TextInput placeholder="Description" {...register("description")} />
      <Button color="green" type="submit">
        Create
      </Button>
    </form>
  );
};

export default CreateProjectModal;
