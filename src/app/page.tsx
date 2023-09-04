import { cookies } from "next/headers";
import apiClientInstance from "../services/api-client/api";
import { COOKIE_KEY } from "../services/config";

import { redirect } from "next/navigation";
import HomePage from "./home/home-page";




async function getBalance() {



    const getCookie = cookies()

    const cookie = getCookie.get(COOKIE_KEY)?.value
    if (!cookie) {
        redirect('/login')
    }
    const cookieData = JSON.parse(cookie)
    const apiClient = apiClientInstance(cookieData);
    const { data } = await apiClient.get('/auth/user/summary');
    return data;


}


export default async function Page() {
    const balance = await getBalance();

    return (
        <HomePage {...balance} />


    )
}