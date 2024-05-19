import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const localIp = "http://192.168.1.25:3001";

const registerUser = async (form) => {
  try {
    const response = await axios.post(`${localIp}/auth/signup`, form);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

const loginUser = async (form) => {
  try {
    const loggedInUser = await axios.post(`${localIp}/auth/signin`, form);
    await AsyncStorage.setItem("accessToken", loggedInUser.data.accessToken);
    return loggedInUser.data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred");
  }
};

const fetchUserDetails = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      return {};
    }
    const response = await axios.post(
      `${localIp}/auth/user`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const user = response.data.user || {};
    await AsyncStorage.setItem("userDetails", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const useAuth = () => {
  const [initialUserDetails, setInitialUserDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const storedUserDetails = await AsyncStorage.getItem("userDetails");
        if (storedUserDetails) {
          setInitialUserDetails(JSON.parse(storedUserDetails));
        }
      } catch (error) {
        console.error("Error loading user details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserDetails();
  }, []);

  const { mutate: addUser } = useMutation(registerUser, {
    onSuccess: async () => {
      router.replace("/sign-in");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const { mutate: login } = useMutation(loginUser, {
    onSuccess: async () => {
      await userDetailsRefetch();
      router.replace("/home");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("userDetails");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const { data: user, refetch: userDetailsRefetch } = useQuery(
    "userDetails",
    fetchUserDetails,
    {
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      initialData: initialUserDetails,
    }
  );

  const loggedIn = !isLoading && user && user.id !== undefined;

  return {
    loggedIn,
    user,
    addUser,
    login,
    logOut,
    userDetailsRefetch,
  };
};
