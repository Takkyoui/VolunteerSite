import { useQuery } from "react-query";
import apiClient from "../apiClient";
type User = {
  name: string;
};
type CommunityData = {
  _id: string;
  title: string;
  content: string;
  image: string;
  userId: User;
  createdAt: string;
  recruitmentStatus: string;
  recruitmentPeriod: string;
};

type VolunteerData = {
  _id: string;
  title: string;
  content: string;
  category: string;
  recruitmentPeriod: string;
  volunteerStartDate: string;
  volunteerEndDate: string;
  recruitmentLimit: string;
  recruitmentStatus: string;
  location: string;
  createdAt: string;
  userId: User;
  image: string;
};

export const useSearch = (path: string, keyword: string) =>
  useQuery<VolunteerData[] | CommunityData[], Error>(
    ["searchData", { path, keyword }],
    async () => {
      const response = await apiClient.get(
        `/api/${path}/search?keyword=${keyword}`
      );
      return response.data;
    }
  );
