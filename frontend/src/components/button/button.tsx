import React from "react";
import cl from "./button.module.css";

const Button = ({ children, ...props }: any) => {
  return (
    <button className={cl.myButton} {...props}>
      {children}
    </button>
  );
};

export default Button;
