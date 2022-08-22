import React from "react";
import { Feed } from "../components/Feed";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export const Homepage = () => {
  //const user = props.user;

  const user = useSelector(selectUser);

  return (
    <>
      <div className="main-div">
        {!user ? (
          <div className="banner">
            <h1 className="banner-title">conduit</h1>
            <p className="banner-text">A place to share your knowledge.</p>
          </div>
        ) : (
          <></>
        )}
        <div className="page">
          <Feed />
        </div>
      </div>
    </>
  );
};
