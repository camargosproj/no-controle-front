import { parseCookie } from "../util";
import apiClientInstance from "./api";

const cookies = parseCookie();

export const apiClient = apiClientInstance(cookies);
