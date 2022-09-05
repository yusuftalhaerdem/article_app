import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ReactValidatableFormProvider } from "react-validatable-form";
import { useValidatableForm } from "react-validatable-form";
import { sendRegisterRequest } from "../actions/ApiActions";
import { Inputs } from "../components/Inputs";
import { addMessage } from "../features/alertSlice";
import { selectLoginUrl } from "../features/navigationSlice";

const pageName = "sign-up";
const inputOutline = {
  email: {
    name: "email",
    type: "text",
  },
  username: {
    name: "username",
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
  {
    path: inputOutline.password.name,
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
    path: inputOutline.username.name,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUrl = useSelector(selectLoginUrl);

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

  const alertFunction = (message) => {
    dispatch(addMessage(message));
  };
  // after sucessfull login, we redirect user to login page.
  const afterFunction = () => {
    navigate(loginUrl);
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (!isValid) {
      setSubmitFailed(true);
      alertFunction("Please fill the form properly");
      console.error("form is not valid yet");
      return;
    }

    sendRegisterRequest(
      getValue(inputOutline.username.name),
      getValue(inputOutline.email.name),
      getValue(inputOutline.password.name),
      alertFunction,
      afterFunction
    );
  };

  return (
    <div className="sign-up-page">
      <h1 className="sign-up-title">Sign up</h1>
      <Link to="../login" className="sign-up-link">
        Have an account?
      </Link>
      <form className="sign-up-form" onSubmit={submitForm}>
        {
          //Inputs() // bunu böyle çağırmakla <> içinde çağırmak arasında ne fark var?
        }
        <Inputs object={prop} />
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
