import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

type Community = {
  title: string;
  content: string;
  image?: File;
};

type User = {
  name: string;
  _id: string;
};

type CommunityData = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  userId: User;
  createdAt: string;
};

export const useCreateCommunity = () => {
  const navigate = useNavigate();

  return useMutation<void, Error, Community>(
    async (formData) => {
      const response = await apiClient.post("/api/community", formData, config);
      return response.data;
    },
    {
      onSuccess: () => {
        navigate("/community");
      },
    }
  );
};
export const useEditCommunity = (slug: string) => {
  const navigate = useNavigate();

  return useMutation<void, Error, Community>(
    async (formData) => {
      const response = await apiClient.put(
        `/api/community/${slug}`,
        formData,
        config
      );
      return response.data;
    },
    {
      onSuccess: () => {
        navigate("/community");
      },
    }
  );
};

export const useGetCommunity = () =>
  useQuery<CommunityData[], Error>("communityData", async () => {
    const response = await apiClient.get("/api/community");
    return response.data;
  });

export const useGetSpecificCommunity = (slug: string) =>
  useQuery<CommunityData, Error>(["communityCommentData", slug], async () => {
    const response = await apiClient.get(`/api/community/${slug}`);
    return response.data;
  });

// export const useDeleteSpecificCommunity = (slug: string) =>
//   useQuery<CommunityData, Error>(["communityDeleteData", slug], async () => {
//     const response = await apiClient.delete(`/api/community/${slug}`);
//     return response.data;
//   });

export const useDeleteSpecificCommunity = () => {
  return useMutation<void, Error, string>(
    (slug: string) => apiClient.delete(`/api/community/${slug}`),
    {
      onSuccess: () => {
        alert("게시글이 삭제되었습니다!");
      },
    }
  );
};
