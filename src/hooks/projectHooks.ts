import { useQuery } from "@tanstack/react-query";
import APIClient from "@/services/apiClient";
import { ProjectInterface } from "@/store/slices/projectSlice";

interface ProjectDTO {
  name: string;
  description: string | undefined;
}

const apiClient = new APIClient<ProjectDTO>("projects/");

const useProjects = () =>
  useQuery<ProjectInterface[]>({
    queryKey: ["projects"],
    queryFn: apiClient.get,
  });

export function useDeleteProject() {}

export default useProjects;
