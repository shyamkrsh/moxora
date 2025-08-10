import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signup, login } from "~/api/auth/authapi";
import * as SecureStore from 'expo-secure-store';


export const signupNewUser = createAsyncThunk(
  "/user/createNewUser",
  async (formState, { rejectWithValue }) => {
    try {
      const response = await signup(formState);
      await SecureStore.setItemAsync("token", response?.accessToken);
      await SecureStore.setItemAsync("refreshToken", response?.refreshToken);
      await SecureStore.setItemAsync("user", JSON.stringify(response.user));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/user/loginUser",
  async (formState, { rejectWithValue }) => {
    try {
      const response = await login(formState);
      await SecureStore.setItemAsync("token", response?.accessToken);
      await SecureStore.setItemAsync("refreshToken", response?.refreshToken);
      await SecureStore.setItemAsync("user", JSON.stringify(response.user));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)



const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: async (state) => {
      state.isLoggedIn = false;
      state.user = null;
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupNewUser.pending, (state) => {
        state.loading = true;
        state.error = null; // use null for "no error" state
        state.isLoggedIn = false;
      })
      .addCase(signupNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(signupNewUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload?.message || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload?.message || "Login failed";
      });
  }

});

export const { logout } = authSlice.actions;
export default authSlice.reducer; // <-- make sure to export reducer
