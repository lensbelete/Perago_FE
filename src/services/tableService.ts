import APIClient from "./apiClient";

export interface TableDto {
  name: string;
}
const apiClient = new APIClient<TableDto>("");

export async function createTableAPI(projectId: string, table: TableDto) {
  apiClient.endPoint = `projects/${projectId}/models`;
  return await apiClient.post({}, table);
}
