import axios from "axios";
import Cookie from "js-cookie";
import isDev from "../../../../utils/isDev";
import { projectURLS } from "../../../../utils/urls";
import { ISignUpUser } from "../interfaces/interfaces";

//? error.repsonse.data has status and so does response.data
export const Login = async (username: string, password: string) => {
  try {
    const loginUser = await axios.request({
      withCredentials: true,
      method: "POST",
      url: isDev() ? `${projectURLS.development}/api/auth/login` : `/api/auth/login`,
      data: {
        username,
        password,
      },
      headers: {
        jwt: `${Cookie.get("jwt")}`,
      },
    });

    return loginUser;
  } catch (error: any) {
    return error.response;
  }
};

export const SignUp = async (user: ISignUpUser) => {
  try {
    const signUpUser = await axios.request({
      withCredentials: true,
      method: "POST",
      url: isDev() ? `${projectURLS.development}/api/auth/signup` : `/api/auth/signup`,
      data: {
        ...user,
      },
    });

    return signUpUser;
  } catch (error: any) {
    return error.response;
  }
};

export const ForgottenPassword = async (email: string) => {
  try {
    const sendForgottenPassword = await axios.request({
      withCredentials: true,
      method: "POST",
      url: isDev() ? `${projectURLS.development}/api/auth/forgottenPassword` : `/api/auth/forgottenPassword`,
      data: {
        email,
      },
    });

    return sendForgottenPassword;
  } catch (error: any) {
    return error.response;
  }
};

//? error.repsonse.data has status and so does response.data
export const Logout = async (username: string, password: string) => {
  try {
    const logoutUser = await axios.request({
      withCredentials: true,
      method: "POST",
      url: isDev() ? `${projectURLS.development}/api/auth/logout` : `/api/auth/logout`,
      headers: {
        jwt: `${Cookie.get("jwt")}`,
      },
    });

    return logoutUser;
  } catch (error: any) {
    return error.response;
  }
};
