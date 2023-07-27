import axios from "axios";
import React from "react";
import { URL, BASE_URL } from "../constant/config";
// import { clearAsyncStorage } from "./storage";

//get
// export const nripromo = async (cityurl, config = {}) =>
//   await get(URL.NRI_PROMO_BANNER + "&cityurl=" + cityurl, config);



//POST


export const get = async (url, config) => {
  console.log(BASE_URL + url);
  try {
    let res = await axios.get(url, config);
    console.log(res);
    return prepareResponse(res);
  } catch (err) {
    return handleException(err);
  }
};
export const post = async (url, data, config) => {
  console.log( url);
  console.log(data);
  try {
    let res = await axios.post(url, data, config);
    console.log(res);
    return prepareResponse(res);
  } catch (err) {
    return handleException(err);
  }
};

 const handleException = (err) => {
  console.log(err);
  try {
    if (err?.response?.data) {
      let { data, status,  } = err.response;
      if (status == 400) {
       alert(
          "Validation Faild",
          data?.message || "Unhandle validation occured"
        );
      } else if (status === 401) {
        alert(
          "UnAuthenticated Access",
          "Session Closed Close your app and Reopen",
          
        );
      } else if (status === 404) {
        alert("Page Not Found", "This Api could not be find it");
      } else {
       alert("Status Failed", `server returns ${status} `);
      }
    }
    // else {
    //   Alert.alert("Information", "Someting went worng or Check your Internet");
    // }
  } catch (error) {
    // Alert.alert(
    //   "Information",
    //   "Someting went worng or Check your Internet",
    //   [
    //     {
    //       text: "Ok",
    //       onPress: () => {
    //         BackHandler.exitApp();
    //       },
    //     },
    //   ],
    //   { cancelable: false }
    // );
  }
  return {};
};
const prepareResponse = (res) => {
  if (res?.status) {
    let { status, data = {} } = res;
    if (status >= 200 && status <= 299) {
      return data;
      // if (data.status == 'success') {
      //     return data;
      // } else if (data.status == 'failure') {
      //     return data;
      // } else if (data.status == 'empty') {
      //     return data;
      // } else if (data.status == 'error') {
      //     Alert.alert('Sorry for the inconvenience', data.message);
      // }
    } else {
      alert(
        "Internal server error",
        `Status Code : ${status}\nMessage : ${data?.message}`
      );
    }
  }
  // else {
  //   Alert.alert("Someting went worng or Check your Internet");
  // }
  return {};
};
