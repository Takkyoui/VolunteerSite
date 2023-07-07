import { useMutation, useQueries, useQuery } from "react-query";
import apiClient from "../apiClient";

type Comment = {
  comment: string;
  path: string;
  id: string;
};
type User = {
  name: string;
};
type Comments = {
  _id: string;
  userId: User;
  content: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
};

export const useCreateComment = () => {
  return useMutation<void, Error, Comment>(async ({ comment, path, id }) => {
    const response = await apiClient.post("/api/comment", {
      comment,
      path,
      id,
    });
    return response.data;
  });
};

export const useGetComments = (path: string, slug: string) => {
  return useQuery<Comments[], Error>(["myComment", path, slug], async () => {
    const response = await apiClient.get(
      `/api/comment?commentType=${path}&id=${slug}`
    );
    return response.data;
  });
};
