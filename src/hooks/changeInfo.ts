import { useMutation } from "react-query";
import apiClient from "../apiClient";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

interface ChangeMyInfo {
  name: string;
  phone: string;
  selfIntro: string;
  image?: File;
}

export const useChangeInfo = () =>
  useMutation<void, Error, ChangeMyInfo>(
    async (formData) =>
      (await apiClient.put("/api/update", formData, config)).data
  );
