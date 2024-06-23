import React from "react";
import classes from "./my-input.module.css";

const MyInput = ({ errorMessage, ...props }: any) => {
  return (
    <div>
      <input className={classes.MyInput} {...props} />
      {errorMessage ? (
        <div className={classes.errorStyle}>{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default MyInput;
