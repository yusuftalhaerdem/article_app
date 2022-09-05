import React from "react";

export const Inputs = (props) => {
  const setPathValue = props.object.setPathValue;
  const getValue = props.object.getValue;
  const getError = props.object.getError;
  const pageName = props.object.pageName;
  const inputOutline = props.object.inputOutline;
  const submitFailed = props.object.submitFailed;
  //console.log(inputOutline);
  /**
  const prop = {
    setPathValue: setPathValue,
    getValue: getValue,
    getError: getError,
    pageName: pageName,
    inputOutline: inputOutline,
    submitFailed: submitFailed,
  };
   */

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const textAreaOnChange = (name) => (event) => {
    event.target.style.minHeight = `${event.target.scrollHeight}px`;
    setPathValue(name, event.target.value);
  };

  const inputs = inputOutline.map((current, index, arr) => {
    const name = current.name;
    const id = `${pageName}-${name}`;
    //console.log(getError(current.name));
    if (current.type !== "textarea") {
      return (
        <div key={id}>
          <input
            id={id}
            className={`${id} input`}
            placeholder={current.placeholder || capitalizeFirstLetter(name)}
            type={current.type}
            value={getValue(name)}
            onChange={(event) => setPathValue(name, event.target.value)}
          />
          {getError(name) && submitFailed && (
            <div className="validataion-error">{getError(name)}</div>
          )}
        </div>
      );
    } else {
      return (
        <div key={id}>
          <textarea
            id={id}
            className={`${id} input`}
            placeholder={current.placeholder || capitalizeFirstLetter(name)}
            value={getValue(name)}
            onChange={textAreaOnChange(name)}
          />
          {getError(name) && submitFailed && (
            <div className="validataion-error">{getError(name)}</div>
          )}
        </div>
      );
    }
  });

  return <>{inputs}</>;
};
