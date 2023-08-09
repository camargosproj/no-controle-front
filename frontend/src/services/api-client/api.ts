import axios from "axios";
import { getCookie } from "cookies-next";

const COOKIE_KEY = process.env.NEXT_PUBLIC_AUTH_COOKIE_KEY || "auth_cookie";

const isServer = typeof window === "undefined";

const baseURL = isServer ? "http://backend:4000" : "http://localhost:4000";
function apiClientInstance(ctx = null) {
  let cookies = null;
  if (ctx) {
    const cookieData = getCookie(COOKIE_KEY, ctx);
    if (cookieData) {
      cookies = JSON.parse(cookieData as string);
    }
  } else {
    const cookieData = getCookie(COOKIE_KEY);
    if (cookieData) {
      cookies = JSON.parse(cookieData as string);
    }
  }

  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies?.accessToken}`,
    },
  });

  return api;
}

export default apiClientInstance;
