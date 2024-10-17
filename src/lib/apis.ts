import axiosInstance from "./axios";
import { useMutation, useQuery } from "@tanstack/react-query";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
}

const loginUser = async (
  loginRequest: LoginRequest,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", loginRequest);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

interface RegisterRequest {
  username: string;
  password: string;
}

interface RegisterResponse {
  message: string;
}

export const register = async (
  registerRequest: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post("/auth/register", registerRequest);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

interface UserResponse {
  username: string;
}

// User
export const getUser = async (): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get("/user/my-profile");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getUser,
  });
};

// Tweets
export const getTweets = async (page: number = 1, pageSize: number = 10) => {
  const response = await axiosInstance.get("/tweet", {
    params: {
      page,
      pageSize,
    },
  });
  return response.data;
};

export const useTweets = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["tweets", page, pageSize],
    queryFn: () => getTweets(page, pageSize),
    // refetchInterval: 1000,
  });
};

export const getTweet = async (id: string) => {
  const response = await axiosInstance.get(`/tweets/${id}`);
  return response.data;
};

export const useTweet = (id: string) => {
  return useQuery({
    queryKey: ["tweet", id],
    queryFn: () => getTweet(id),
  });
};

export const createTweet = async (content: string) => {
  const response = await axiosInstance.post("/tweet", { content });
  return response.data;
};

export const useCreateTweet = () => {
  return useMutation({
    mutationFn: createTweet,
  });
};

export const likeTweet = async (tweetId: string, like: boolean = true) => {
  const response = await axiosInstance.post(
    `/tweet/like/${tweetId}?like=${like}`,
  );
  return response.data;
};

export const useLikeTweet = () => {
  return useMutation({
    mutationFn: ({ tweetId, like }: { tweetId: string; like: boolean }) =>
      likeTweet(tweetId, like),
  });
};
