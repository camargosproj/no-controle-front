import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_KEY } from "../config";
import { CookieData } from "./server-side-utils.type";

export function parseServerCookies(): CookieData {
  const getCookie = cookies();

  const cookie = getCookie.get(COOKIE_KEY)?.value;
  if (!cookie) {
    redirect("/login");
  }
  const cookieData = JSON.parse(cookie);

  return cookieData;
}
