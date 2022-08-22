import React from "react";
import { Link } from "react-router-dom";
import { ReactValidatableFormProvider } from "react-validatable-form";
import { useValidatableForm } from "react-validatable-form";
import { sendRegisterRequest } from "../actions/ApiActions";

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
  {
    path: "password",
    ruleSet: [
      { rule: "required" },
      {
        rule: "length",
        lessThan: 16,
      },
      {
        rule: "length",
        greaterThan: 6,
      },
    ],
  },
  {
    path: "username",
    ruleSet: [
      { rule: "required" },
      {
        rule: "length",
        lessThan: 17,
      },
      {
        rule: "length",
        greaterThan: 7,
      },
    ],
  },
];
export const SignUp = () => {
  const { isValid, formData, setPathValue, getValue, getError } =
    useValidatableForm({
      rules,
      initialFormData,
    });

  const getUserInfo = (event) => {
    event.preventDefault();
    if (!isValid) {
      alert("form is not filled.");
      console.error("form is not valid yet");
      return;
    }
    const username_value = document.getElementById("sign-up-username").value;
    const email_value = document.getElementById("sign-up-email").value;
    const password_value = document.getElementById("sign-up-password").value;
    sendRegisterRequest(username_value, email_value, password_value).then(() =>
      alert("account is successfully created")
    );
  };
  return (
    <div className="sign-up-page">
      <h1 className="sign-up-title">Sign up</h1>
      <Link to="../login" className="sign-up-link">
        Have an account?
      </Link>
      <form className="sign-up-form" onSubmit={getUserInfo}>
        <input
          value={getValue("username")}
          onChange={(event) => setPathValue("username", event.target.value)}
          id="sign-up-username"
          className="sign-up-username sign-up-input"
          type="text"
          placeholder="Username"
        ></input>
        {getError("username") && (
          <div className="validataion-error">{getError("username")}</div>
        )}
        <input
          value={getValue("email")}
          onChange={(event) => setPathValue("email", event.target.value)}
          id="sign-up-email"
          className="sign-up-email sign-up-input"
          type="text"
          placeholder="Email"
        ></input>
        {getError("email") && (
          <div className="validataion-error">{getError("email")}</div>
        )}
        <input
          value={getValue("password")}
          onChange={(event) => setPathValue("password", event.target.value)}
          id="sign-up-password"
          className="sign-up-password sign-up-input"
          type="password"
          placeholder="Password"
        ></input>
        {getError("password") && (
          <div className="validataion-error">{getError("password")}</div>
        )}
        <div className="submit-container">
          <input
            className="sign-up-submit"
            type="submit"
            value="Sign Up"
          ></input>
        </div>
      </form>
    </div>
  );
};
