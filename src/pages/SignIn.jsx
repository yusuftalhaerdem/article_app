import React from "react";
import { sendLoginRequest } from "../actions/ApiActions";
import { useValidatableForm } from "react-validatable-form";
import { useDispatch } from "react-redux";
import { logIn } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const initialFormData = {};
const rules = [
  {
    path: "email",
    ruleSet: [
      {
        rule: "required",
      },
      {
        rule: "email",
      },
    ],
  },
  { path: "password", ruleSet: [{ rule: "required" }] },
];

export const SignIn = () => {
  //const user = useSelector(selectUser);
  const dispatch = useDispatch();
  /*
  const navigation = () => dispatch(changeNavigationTab("Sign in"));
  useEffect(() => {
    dispatch(changeNavigationTab("Sign in"));
  }, []);
*/
  const { isValid, formData, setPathValue, getValue, getError } =
    useValidatableForm({
      rules,
      initialFormData,
    });

  const navigate = useNavigate();
  const setUser = (user) => {
    dispatch(logIn(user));
    navigate("../");
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (!isValid) {
      alert("form is not filled.");
      console.error("form is not valid yet");
      return;
    }

    const email_value = document.getElementById("sign-in-email").value;
    const password_value = document.getElementById("sign-in-password").value;

    sendLoginRequest(email_value, password_value, setUser);
  };

  return (
    <>
      <div className="sign-in-page">
        <h1 className="sign-in-title">Sign in</h1>
        <Link to="../register" className="sign-in-link">
          Need an account?
        </Link>
        <form className="sign-in-form" onSubmit={submitForm}>
          <input
            value={getValue("email")}
            onChange={(event) => setPathValue("email", event.target.value)}
            id="sign-in-email"
            type="text"
            placeholder="Email"
            className="input"
          ></input>
          {getError("email") && (
            <div className="validataion-error">{getError("email")}</div>
          )}
          <input
            value={getValue("password")}
            onChange={(event) => setPathValue("password", event.target.value)}
            id="sign-in-password"
            type="password"
            placeholder="Password"
            className="input"
          ></input>
          {getError("password") && (
            <div className="validataion-error">{getError("password")}</div>
          )}
          <div className="submit-container">
            <input
              id="sign-in-submit"
              type="submit"
              className="submit"
              value="Sign In"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};
