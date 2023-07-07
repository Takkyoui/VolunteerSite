import { useQuery } from "react-query";
import apiClient from "../apiClient";

type User = {
  name: string;
};

type Data = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  userId: User;
  createdAt: string;
  recruitmentPeriod: string;
  recruitmentStatus: string;
};

export const useGetMyPost = (slug: string) =>
  useQuery<Data[], Error>(["myPostData", { slug }], async () => {
    const response = await apiClient.get(`/api/${slug}/mypost`);
    return response.data;
  });
