import { useMutation, useQuery } from "react-query";
import apiClient from "../apiClient";

interface CreateVolunteerData {
  title: string;
  content: string;
  category: string;
  recruitmentPeriod: string;
  volunteerStartDate: string;
  volunteerEndDate: string;
  recruitmentLimit: string;
  location: string;
  image?: File;
}
type User = {
  _id: string;
  name: string;
  email: string;
  selfIntro: string;
};

interface VolunteerData {
  _id: string;
  title: string;
  content: string;
  category: string;
  recruitmentPeriod: string;
  volunteerStartDate: string;
  volunteerEndDate: string;
  recruitmentLimit: string;
  recruitmentStatus: string;
  registeredUsers: User[];
  location: string;
  userId: User;
  image: string;
  createdAt: string;
}

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const useCreateVolunteer = () =>
  useMutation<void, Error, CreateVolunteerData>(
    async (formData) =>
      (await apiClient.post("/api/volunteer", formData, config)).data
  );

export const useGetVolunteer = () =>
  useQuery<VolunteerData[], Error>("volunteerData", async () => {
    const response = await apiClient.get("/api/volunteer");
    return response.data;
  });

export const useGetVolunteerDetail = (slug: string) =>
  useQuery<VolunteerData, Error>("volunteerDataDetail", async () => {
    const response = await apiClient.get(`/api/volunteer/${slug}`);
    return response.data;
  });

type Participate = {
  postId: string;
  action: string;
};
export const useParticipateVolunteer = () => {
  return useMutation<void, Error, Participate>(async ({ postId, action }) => {
    const response = await apiClient.post("/api/volunteer/participate", {
      postId,
      action,
    });
    return response.data;
  });
};

export const useGetMyVolunteer = () =>
  useQuery<VolunteerData[], Error>("volunteerData", async () => {
    const response = await apiClient.get("/api/volunteer/mypost");
    return response.data;
  });
export const useGetMyParticipateVolunteer = () =>
  useQuery<VolunteerData[], Error>("volunteerData", async () => {
    const response = await apiClient.get("/api/volunteer/myparticipate");
    return response.data;
  });

// type Comment = {
//   comment: string;
//   path: string;
//   id: string;
// };

// export const useCreateComment = () => {
//   return useMutation<void, Error, Comment>(async ({ comment, path, id }) => {
//     const response = await apiClient.post("/api/comment", {
//       comment,
//       path,
//       id,
//     });
//     return response.data;
//   });
// };
