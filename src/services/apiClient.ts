import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

class APIClient<T> {
  endPoint: string;
  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  get = <T>(config: AxiosRequestConfig = {}) =>
    axiosInstance
      .get<T>(this.endPoint, config)
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });

  post = (config: AxiosRequestConfig = {}, data: any) =>
    axiosInstance
      .post(this.endPoint, data, config)
      .then((response) => response)
      .catch((err) => {
        throw err;
      });

  update = (config: AxiosRequestConfig = {}, data: any) =>
    axiosInstance.patch(this.endPoint, data, config);

  delete = (config: AxiosRequestConfig = {}, itemId?: string) => {
    return axiosInstance.delete(this.endPoint + itemId, config);
  };
}

export default APIClient;
