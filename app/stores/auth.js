import { useMutation } from "react-query";
import axios from "axios";
import { router } from "expo-router";

const localIp = "http://192.168.1.24:3001";

const registerUser = async (form) => {
  try {
    const response = await axios.post(`${localIp}/auth/signup`, form);
    console.log(response);
    return response.data;
  } catch (error) {
    // Improved error handling
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const useAuth = () => {
  const { mutate: addUser } = useMutation(registerUser, {
    onSuccess: async () => {
      router.replace("/home");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  return {
    addUser,
  };
};
