import apiClientInstance from "../services/api-client/api";

import { parseServerCookies } from "../services/util/server-side-utils";
import HomePage from "./home/home-page";



async function getBalance() {
    const cookieData = parseServerCookies()
    const apiClient = apiClientInstance(cookieData);
    const { data } = await apiClient.get("/auth/user/summary");

    return data;
}

export default async function Page() {
    const balance = await getBalance();

    return <HomePage {...balance} />;
}
