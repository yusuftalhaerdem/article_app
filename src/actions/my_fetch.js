import { useDispatch } from "react-redux";
import { addMessage } from "../features/alertSlice";

const alert_types = ["success", "error", "warning", "info"];
const alertSuccessType = "success";
const alertErrorType = "error";
const alertWarningType = "warning";
const alertInfoType = "info";

export const my_fetch = (
  url,
  method = "GET",
  token = null,
  body = null,
  alert = null,
  successMessage = null,
  errorMessage = null
) => {
  return basic_fetch(url, method, token, body)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "error") {
        console.log(res.message);
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const fetch_update_state = (
  url,
  method = "GET",
  token = null,
  body = null,
  state = null,
  setState = null
) => {
  return basic_fetch(url, method, token, body)
    .then((res) => res.json())
    .then((res) => {
      //console.log(res);
      if (state === null) {
        //console.log(res);
      } else {
        const responseObject = Object.values(res)[0];
        console.log(res);
        //console.log(res);
        if (res.status === "error") console.error(res.message);
        else if (JSON.stringify(responseObject) !== JSON.stringify(state)) {
          if (responseObject !== "error") {
            setState(responseObject);
          } else {
            console.log("fetched error");
          }
        }
      }
      return res;
    })
    .catch((err) => console.log(err));
};

// the most basic fetch operation, i will coat this.
export const basic_fetch = (url, method = "GET", token = null, body = null) => {
  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    method: method,
    ...(body ? { body: body } : {}),
  });
};
