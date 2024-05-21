import { Button } from "@mantine/core";
import React from "react";

const DeleteProjectModal = ({
  projectId,
  projectName,
  handleDelete,
}: {
  projectId: string;
  projectName: string;
  handleDelete: (projectId: string) => void;
}) => {
  return (
    <>
      <p>Are you sure you want to delete this project</p>
      <Button color="green" onClick={() => handleDelete(projectId)}>
        Delete
      </Button>
    </>
  );
};

export default DeleteProjectModal;
