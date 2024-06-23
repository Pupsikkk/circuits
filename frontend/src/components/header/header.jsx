import React, { useContext, useState } from "react";
import Button from "../button/button";
import Modal from "../modal/modal";
import LoginForm from "../login-form/login-form";
import RegistrationForm from "../registration-form/registration-form";
import { AuthContext } from "../../../context";
import "./header.module.css";

const Header = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  const [registrationModal, setRegistrationModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const injectModals = () => {
    return (
      <div>
        <Modal visible={loginModal} setVisible={setLoginModal}>
          <LoginForm setLoginModal={setLoginModal} />
        </Modal>
        <Modal visible={registrationModal} setVisible={setRegistrationModal}>
          <RegistrationForm setRegistrationModal={setRegistrationModal} />
        </Modal>
      </div>
    );
  };

  if (authData.isAuth)
    return (
      <header>
        <nav>
          <Button
            onClick={() =>
              setAuthData({ isAuth: false, profile: null, token: null })
            }
          >
            Logout
          </Button>
        </nav>
        {injectModals()}
      </header>
    );

  return (
    <header>
      <nav>
        <Button onClick={() => setLoginModal(true)}>Login</Button>
        <Button onClick={() => setRegistrationModal(true)}>Sign Up</Button>
      </nav>

      {injectModals()}
    </header>
  );
};

export default Header;
