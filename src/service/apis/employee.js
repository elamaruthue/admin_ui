import { BASE_URL, URL } from "../constant/config";
import { get, post } from "../network/api";

 export const getEmployeeData = async (config = {}) =>
  await get(BASE_URL+URL.GetEmployee, config);

  export const addEmployeeData = async (data = {}, config = {}) =>
  await post(BASE_URL+URL.AddEmployee, data, config);