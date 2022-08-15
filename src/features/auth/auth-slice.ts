import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.min.css";
import type { RootState } from "../../app/store";
import authService from "./services/auth.service";
import { DisplayUser } from "./models/display-user.model";
import { Jwt } from "./models/jwt.model";
import { NewUser } from "./models/new-user";
import { LoginUser } from "./models/login-user";

const storedUser: string | null = localStorage.getItem("user");
const user: DisplayUser | null = storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: Jwt = storedJwt ? JSON.parse(storedJwt) : null;

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  user,
  jwt,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (rUser: NewUser, thunkAPI) => {
    try {
      return await authService.register(rUser);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to register!");
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (lUser: LoginUser, thunkAPI) => {
    try {
      return await authService.login(lUser);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to login");
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const verifyJwt = createAsyncThunk(
  "auth/verify-jwt",
  async (vJWT: string, thunkAPI) => {
    try {
      return await authService.verifyJwt(vJWT);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to verify");
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      const State = { ...state };
      State.isLoading = false;
      State.isSuccess = false;
      State.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        const State = { ...state };
        State.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        const State = { ...state };
        State.isLoading = false;
        State.isSuccess = true;
        State.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        const State = { ...state };
        State.isLoading = false;
        State.isError = true;
        State.user = null;
      })
      // LOGIN
      .addCase(login.pending, (state) => {
        const State = { ...state };
        State.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const State = { ...state };
        State.isLoading = false;
        State.isSuccess = true;
        State.jwt = action.payload.jwt;
        State.isAuthenticated = true;
        State.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        const State = { ...state };
        State.isLoading = false;
        State.isError = true;
        State.user = null;
        State.isAuthenticated = false;
        State.user = null;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        const State = { ...state };
        State.user = null;
        State.jwt = null;
        State.isAuthenticated = false;
      })
      // VERIFY JWT
      .addCase(verifyJwt.pending, (state) => {
        const State = { ...state };
        State.isLoading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        const State = { ...state };
        State.isLoading = false;
        State.isSuccess = true;
        State.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        const State = { ...state };
        State.isLoading = false;
        State.isError = true;
        State.isAuthenticated = false;
      });
  },
});

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth;
};

export default authSlice.reducer;
