import React from "react";
import cl from "./modal.module.css";

const Modal = ({ children, visible, setVisible }: any) => {
  const rootClasses = [cl.modal];
  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    <div onClick={() => setVisible(false)} className={rootClasses.join(" ")}>
      <div onClick={(e) => e.stopPropagation()} className={cl.modalContent}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
