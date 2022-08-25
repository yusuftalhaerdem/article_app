import React, { useState } from "react";

export const ContextButton = (props) => {
  const isDarkMode = props.isDarkMode;
  const setDarkMode = props.setDarkMode;
  const changeDarkMode = () => {
    setDarkMode(!isDarkMode);
  };
  return (
    <div className="dark-mode" onClick={changeDarkMode}>
      Dark
    </div>
  );
};
