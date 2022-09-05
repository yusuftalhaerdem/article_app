import React, { useState } from "react";
import { updateUser } from "../actions/ApiActions";
import { useSelector, useDispatch } from "react-redux";
import { logOut, logIn, selectUser } from "../features/userSlice";
import { useNavigate } from "react-router";
import { Inputs } from "../components/Inputs";
import { addMessage } from "../features/alertSlice";
import { selectHomepageUrl } from "../features/navigationSlice";

const pageName = "settings";
const inputOutline = {
  image: {
    name: "image",
    type: "text",
    placeholder: "URL of profile picture",
  },
  username: {
    name: "username",
    type: "text",
  },
  bio: {
    name: "bio",
    type: "textarea",
    placeholder: "Short bio about you",
  },
  email: {
    name: "email",
    type: "textarea",
  },
  password: {
    name: "password",
    type: "password",
  },
};
const UserSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const homepageUrl = useSelector(selectHomepageUrl);

  const [state, setState] = useState({
    image: user.image || "",
    username: user.username || "",
    email: user.email || "",
    bio: user.bio || "",
  });

  const alertFunction = (message) => {
    dispatch(addMessage(message));
  };
  const afterFunction = () => {
    //navigate(homepageUrl);
  };

  const updateUserFunction = (event) => {
    event.preventDefault();

    // third parameter is a function that makes user logged in or updated according to given user info.
    updateUser(
      state,
      user,
      (data) => {
        dispatch(logIn(data));
      },
      document.getElementById("settings-password").value,
      alertFunction,
      afterFunction
    );
  };

  // logs out the user
  const logOutUser = () => {
    localStorage.removeItem("user");
    dispatch(logOut());
    navigate("../");
    alertFunction("you have logged out.");
    // i may destroy the token here to provide safety.
  };

  const setStateFunc = (name, payload) => {
    setState({ [name]: payload });
  };
  const getValue = (name) => {
    return state[name];
  };

  const prop = {
    setPathValue: setStateFunc,
    getValue: getValue,
    getError: () => false,
    pageName: pageName,
    inputOutline: Object.values(inputOutline),
    submitFailed: false,
  }; /**/

  return (
    <div className="form-container">
      <h1 className="setting-title">Your Settings</h1>
      <form className="form">
        <Inputs object={prop} />

        <input
          type="submit"
          value="Update Settings"
          className="submit"
          id="settings-submit"
          onClick={updateUserFunction}
        />
        <div className="divider-line"></div>
      </form>
      <button
        className="logout submit"
        id="settings-logout"
        onClick={logOutUser}
      >
        Or click here to logout.
      </button>
    </div>
  );
};

export default UserSetting;
