import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { DecodedJwt } from "../models/decoded-jwt.model";
import { DisplayUser } from "../models/display-user.model";
import { Jwt } from "../models/jwt.model";
import { LoginUser } from "../models/login-user";
import { NewUser } from "../models/new-user";

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await toast.promise(
    axios.post(`${process.env.REACT_APP_BASE_API}/auth/register`, newUser),
    {
      pending: "Registering user...",
      success: "User registered successfully",
      error: "Unable to register user",
    },
  );
  return response.data;
};

const login = async (
  user: LoginUser,
): Promise<{ jwt: Jwt; user: DisplayUser | null }> => {
  const response = await toast.promise(
    axios.post(`${process.env.REACT_APP_BASE_API}/auth/login`, user),
    {
      pending: "Logging in...",
      success: "User logged in successfully",
      error: "Unable to log in user",
    },
  );

  if (response.data) {
    localStorage.setItem("jwt", JSON.stringify(response.data));
    const decodedJwt: DecodedJwt = jwt_decode(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodedJwt.user));
    return { jwt: response.data, user: decodedJwt.user };
  }
  return { jwt: response.data, user: null };
};

const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await toast.promise(
    axios.post(`${process.env.REACT_APP_BASE_API}/auth/verify-jwt`, { jwt }),
    {
      pending: "Verifying User...",
      success: "User verified successfully",
      error: "Unable to verify User",
    },
  );

  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }

  return false;
};

const authService = {
  register,
  verifyJwt,
  login,
  logout,
};

export default authService;
