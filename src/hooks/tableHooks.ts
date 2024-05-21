import { useQuery } from "@tanstack/react-query";
import APIClient from "@/services/apiClient";
import { TableInterface } from "@/zustandStore/tableStore";
import { TableDto } from "@/services/tableService";

const apiClient = new APIClient<TableDto>("");

const useTables = (projectId: string) =>
  useQuery({
    queryKey: [projectId],
    queryFn: () => {
      apiClient.endPoint = `projects/${projectId}/models`;

      return apiClient.get<TableInterface[]>();
    },
  });

export default useTables;
