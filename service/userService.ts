import axiosInstance from "../API/axiosInstance";
import { User } from "../types/user";

type UsersResponse = {
  data: User[];
};

export const getUsers = async (page: number) => {
  const response = await axiosInstance.get<UsersResponse>(
    `/api/users?page=${page}`
  );

  return response.data.data;
};
