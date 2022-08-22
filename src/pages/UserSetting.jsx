import React, { useState } from "react";
import { updateUser } from "../actions/ApiActions";
import { useSelector, useDispatch } from "react-redux";
import { logOut, logIn, selectUser } from "../features/userSlice";
import { useNavigate } from "react-router";

const UserSetting = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    image: user.image || "",
    username: user.username || "",
    email: user.email || "",
    bio: user.bio || "",
  });

  const updateUserFunction = (event) => {
    event.preventDefault();

    // third parameter is a function that makes user logged in or updated according to given user info.
    updateUser(
      state,
      user,
      (data) => {
        dispatch(logIn(data));
      },
      document.getElementById("settings-password").value
    );
  };

  const navigate = useNavigate();
  // logs out the user
  const deleteUserFunction = () => {
    localStorage.removeItem("user");
    dispatch(logOut());
    navigate("../");
  };

  return (
    <div className="form-container">
      <h1>Your Settings</h1>
      <form className="form">
        <input
          type="text"
          placeholder="URL of profile picture"
          className="input"
          id="settings-picture-url"
          value={state.image}
          onChange={(event) => {
            setState({ image: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Username"
          className="input"
          id="settings-username"
          value={state.username}
          onChange={(event) => {
            setState({ username: event.target.value });
          }}
        />
        <textarea
          type="text"
          placeholder="Short bio about you"
          className="input"
          id="settings-bio"
          value={state.bio}
          onChange={(event) => {
            setState({ bio: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Email"
          className="input"
          id="settings-email"
          value={state.email}
          onChange={(event) => {
            setState({ email: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="New password"
          className="input"
          id="settings-password"
        />
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
        onClick={deleteUserFunction}
      >
        Or click here to logout.
      </button>
    </div>
  );
};

export default UserSetting;
