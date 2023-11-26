import axios from "axios";
import { axiosBackend } from "../axios";

export const checkSession = async () => {
  try {
    const response = await axiosBackend.get("/check-session");
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to check session:", error.message);
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/login",
      { username, password },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }
    );
    console.log("response.data", response.data);
  } catch (error: any) {
    console.error("Failed to login:", error.message);
    throw error;
  }
};
