import { Button, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useDisclosure } from "@mantine/hooks";

const schema = yup.object({
  name: yup.string().required(),
});

const EditProjectModal = ({
  projectId,
  projectName,
  submit,
}: {
  projectId: string;
  projectName: string;
  submit: (projectId: string, newName: string) => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: projectName }, // Set default values from project prop
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    const newName = data.name;
    if (newName != projectName) {
      console.log("now i will call the submit function");
      submit(projectId, newName);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder={projectName}
        {...register("name")}
        error={errors.name?.message}
        className={errors.name ? "error-input" : ""}
      />
      <Button color="green" type="submit">
        Edit
      </Button>
    </form>
  );
};

export default EditProjectModal;
