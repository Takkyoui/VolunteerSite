import { useMutation, useQuery } from "react-query";
import apiClient from "../apiClient";
import { useNavigate } from "react-router-dom";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

type Review = {
  title: string;
  content: string;
  image?: File;
};

type User = {
  name: string;
  _id: string;
};

type ReviewData = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  userId: User;
  createdAt: string;
};

export const useCreateReview = () => {
  const navigate = useNavigate();

  return useMutation<void, Error, Review>(
    async (formData) => {
      const response = await apiClient.post("/api/review", formData, config);
      return response.data;
    },
    {
      onSuccess: () => {
        navigate("/review");
      },
    }
  );
};

export const useEditReview = (slug: string) => {
  const navigate = useNavigate();

  return useMutation<void, Error, Review>(
    async (formData) => {
      const response = await apiClient.put(
        `/api/review/${slug}`,
        formData,
        config
      );
      return response.data;
    },
    {
      onSuccess: () => {
        navigate("/review");
      },
    }
  );
};

export const useGetReview = () =>
  useQuery<ReviewData[], Error>("reviewData", async () => {
    const response = await apiClient.get("/api/review");
    return response.data;
  });

export const useGetSpecificReview = (slug: string) =>
  useQuery<ReviewData, Error>(["reviewCommentData", slug], async () => {
    const response = await apiClient.get(`/api/review/${slug}`);
    return response.data;
  });

export const useDeleteSpecificReview = () => {
  return useMutation<void, Error, string>(
    (slug: string) => apiClient.delete(`/api/review/${slug}`),
    {
      onSuccess: () => {
        alert("게시글이 삭제되었습니다!");
      },
    }
  );
};
