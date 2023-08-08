import { BASE_URL, URL } from "../constant/config";
import { get, post } from "../network/api";

 export const getSupervisorData = async (config = {}) =>
  await get(BASE_URL+URL.GetSupervisor, config);

  export const addSupervisorData = async (data = {}, config = {}) =>
  await post(BASE_URL+URL.AddSupervisor, data, config);