import { useQuery } from "react-query";
import apiClient from "../apiClient";

export const useGetCounts = (path: string) => {
  return useQuery<any, Error>(["count", path], async () => {
    const response = await apiClient.get(`/api/${path}/counts`);
    return response.data;
  });
};
