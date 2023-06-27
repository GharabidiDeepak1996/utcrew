import axios from "axios";
export const axiosErrorHandler = (error) => {
  if (axios.isCancel(error)) {
    return { message: `Request cancelled ${error.message}` };
  }
  const { request, response } = error;
  console.log("Error Message", request, response, error);
  if (response) {
    let message = "";
    if (isObject(response.data)) {
      if (hasProp(response.data, "message")) {
        message = response.data.message;
      } else {
        message = Object.values(response.data)
          .map((value) => value)
          .join(",");
      }
    } else {
      message = response.data;
    }
    return {
      message: message,
    };
  } else if (request) {
    return {
      message: request.message,
    };
  } else {
    return { message: "opps! something went wrong while setting up request" };
  }
};

function isObject(data) {
  return data && typeof data === "object" && data.constructor === Object;
}
function hasProp(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}
