import APIClient from "@/services/apiClient";
import { ColumnDto } from "@/services/columnService";
import { ColumnInterface } from "@/zustandStore/columnStore";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<ColumnDto>("");

const useColumns = (modelId: string) =>
  useQuery({
    queryKey: [modelId],
    queryFn: () => {
      apiClient.endPoint = `models/${modelId}/columns`;
      return apiClient.get<ColumnInterface>();
    },
  });

export default useColumns;
