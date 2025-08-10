import axios from "axios";
import ENV from '../../../env'

export const signup = async (formState) => {
  try {
    console.log("Api Called!");
    const response = await axios.post(
      `https://393a9d432ac7.ngrok-free.app/api/user/signup`,
      { formState },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error -- ", error);
    // Throw the error data to caller (including message from backend)
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const login = async (formState) => {
  try {
    console.log("Api Called!");
    const response = await axios.post(
      `https://393a9d432ac7.ngrok-free.app/api/user/login`,
      { formState },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error -- ", error);
    // Throw the error data to caller (including message from backend)
    throw error.response?.data || { message: "Login failed" };
  }
}

