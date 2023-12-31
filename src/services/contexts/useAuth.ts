"use client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { excludePaths } from "../../components/layout/Layout";
import api from "../api-client/api";
import { apiClient } from "../api-client/apiClient";

import { AuthLogin, SignInResponse } from "./auth.type";

const COOKIE_KEY = process.env.NEXT_PUBLIC_AUTH_COOKIE_KEY || "auth_cookie";

const apiClientInstance = api();

export const AuthContext = createContext({
  user: null,
  login: (props: AuthLogin) => new Promise(() => {}),
  logout: () => new Promise(() => {}),
  getCookieData: () => {
    return null;
  },
});

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
export function useAuthProvider() {
  const [user, setUser] = useState(null);
  const cookieData = getCookie(COOKIE_KEY);
  const router = useRouter();
  const pathname = usePathname();

  const login = async (props: AuthLogin) => {
    try {
      const response = await apiClientInstance.post("/auth/singin", props);

      setUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        validated: response.data.validated,
      });
      setLoginCookie(response.data);
      router.push("/");
    } catch (error) {
      toast(error?.response?.data?.message || "Algo deu errado", {
        type: "error",
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  const getCookieData = () => {
    return cookieData;
  };

  const logout = async () => {
    deleteLoginCookie();
    setUser(null);

    apiClientInstance.defaults.headers.Authorization = null;
    apiClient.defaults.headers.Authorization = null;
    router.push("/login");
    router.refresh();
  };

  // Store login token / user data in cookie
  const setLoginCookie = (data: SignInResponse) => {
    setCookie(COOKIE_KEY, data);
  };

  // Delete login cookie
  const deleteLoginCookie = () => {
    deleteCookie(COOKIE_KEY);
  };

  // Pull user data from API
  const loadUser = async () => {
    try {
      if (excludePaths.includes(pathname)) {
        return;
      }
      if (!cookieData) {
        router.push("/login");
        return;
      }

      const userData = JSON.parse(cookieData as string) as SignInResponse;
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        validated: userData.validated,
      });
    } catch (error) {
      router.push("/login");
    }
  };

  // Send password reset email
  const sendPasswordResetEmail = (email: string) => {
    /* TODO */
  };

  // Subscribe to user on mount
  useEffect(() => {
    loadUser();
  }, []); //eslint-disable-line

  // Return the user object and auth methods
  return {
    user,
    login,
    logout,
    getCookieData,
    // sendPasswordResetEmail,
    // setLoginCookie,
  };
}
