import React from "react";

export const ContextButton = (props) => {
  const isDarkMode = props.isDarkMode;
  const setDarkMode = props.setDarkMode;
  const changeDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  // starry night update will be soon :)
  const stars = () => {};
  return (
    <div className="dark-mode" onClick={changeDarkMode}>
      <div className="moon"></div>
      <div className="stars">{stars()}</div>
    </div>
  );
};
