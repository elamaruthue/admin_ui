import { BASE_URL, URL } from "../constant/config";
import { post } from "../network/api";

export const login = async (data = {}, config = {}) =>
  await post(BASE_URL+URL.Login, data, config);