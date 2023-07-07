import { useQuery } from "react-query";
import apiClient from "../apiClient";

type UserData = {
  _id: string;
  name: string;
  email: string;
  selfIntro: string;
  phoneNumber: string;
  image: string;
};
export const useGetMyInfo = () =>
  useQuery<UserData, Error>("myPostData", async () => {
    const response = await apiClient.get(`/api/myinfo`);
    return response.data;
  });
