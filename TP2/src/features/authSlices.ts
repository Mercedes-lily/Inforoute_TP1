import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import djangoApi from "@/services/djangoApi";
import { AuthState, User } from "../types/auth";
import { RootState } from "@/app/store";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await djangoApi.post("/api/token/", credentials);

      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur de connexion"
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await djangoApi.get("/api/profile/", {
        headers: { Authorization: `Token ${token}` },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur de récupération du profil"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    userData: { email: string; username: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await djangoApi.put("/api/profile/update/", userData, {
        headers: { Authorization: `Token ${token}` },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue("Erreur lors de la mise à jour du profil");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
