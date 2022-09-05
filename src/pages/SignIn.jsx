import React, { useState } from "react";
import { sendLoginRequest } from "../actions/ApiActions";
import { useValidatableForm } from "react-validatable-form";
import { useDispatch } from "react-redux";
import { logIn } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Inputs } from "../components/Inputs";
import { addMessage } from "../features/alertSlice";

const pageName = "sign-in";
const inputOutline = {
  email: {
    name: "email",
    type: "text",
  },
  password: {
    name: "password",
    type: "password",
  },
};
const initialFormData = {};
const rules = [
  {
    path: inputOutline.email.name,
    ruleSet: [
      {
        rule: "required",
      },
      {
        rule: "email",
      },
    ],
  },
  { path: inputOutline.password.name, ruleSet: [{ rule: "required" }] },
];

export const SignIn = () => {
  const dispatch = useDispatch();

  // only if user tried to continue with missing info, we will show missing error.
  const [submitFailed, setSubmitFailed] = useState(false);
  const { isValid, formData, setPathValue, getValue, getError } =
    useValidatableForm({
      rules,
      initialFormData,
    });

  const prop = {
    setPathValue: setPathValue,
    getValue: getValue,
    getError: getError,
    pageName: pageName,
    inputOutline: Object.values(inputOutline),
    submitFailed: submitFailed,
  };

  const navigate = useNavigate();
  const setUser = (user) => {
    dispatch(logIn(user));
    navigate("../");
  };
  const alertFunction = (message) => {
    dispatch(addMessage(message));
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (!isValid) {
      setSubmitFailed(true);
      console.log("form is not valid yet!!");
      alertFunction("Please fill the form correctly before submitting.");
      return;
    }

    sendLoginRequest(
      getValue(inputOutline.email.name),
      getValue(inputOutline.password.name),
      setUser,
      alertFunction
    );
  };

  return (
    <>
      <div className="sign-in-page">
        <h1 className="sign-in-title">Sign in</h1>
        <Link to="../register" className="sign-in-link">
          Need an account?
        </Link>
        <form className="sign-in-form" onSubmit={submitForm}>
          <Inputs object={prop} />
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
