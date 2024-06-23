import React, { useContext, useState } from "react";
import MyInput from "../input/my-input";
import Button from "../button/button";
import cl from "./login-form.module.css";
import { AuthContext } from "../../context";
import { UserService } from "../../API/user.service";
import styled from "styled-components";

const Wrapper = styled.section`
  padding 2em;
  background: #25a07f;
  height: 100vh;
  display: flex;
  flex-grow: 1;
  justify-content:center;
  margin: 0 auto;
`;

const Info = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginForm = ({ onChangeContent }: any) => {
  const { authData, setAuthData } = useContext<any>(AuthContext);

  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  async function login(e: any) {
    e.preventDefault();

    try {
      const token = await UserService.login(loginData);
      const profile = await UserService.getProfile(token);

      setAuthData({ ...authData, isAuth: true, token, profile });
      setLoginData({
        email: "",
        password: "",
      });
      localStorage.setItem("dyplomToken", token);

      onChangeContent("Editor");
    } catch (err: any) {
      setError(err);
    }
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: "#25a07f",
        }}
      >
        <button
          className={cl.goBackButton}
          onClick={() => onChangeContent("Home")}
        >
          &#8592; &nbsp;&nbsp; Повернутись
        </button>
      </div>
      <Wrapper>
        <Info>
          <form className={cl.formWrapper}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1 style={{ color: "black" }}>Авторизація</h1>
            </div>
            <div className={cl.inputs}>
              <MyInput
                autocomplete="email"
                value={loginData.email}
                onChange={(e: any) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                type="text"
                placeholder="Електронна пошта"
              />
              <MyInput
                autocomplete="current-password"
                type="password"
                value={loginData.password}
                onChange={(e: any) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                placeholder="Пароль"
              />
              {!!error ? (
                <div className={cl.errorMessage}>Невірний логін або пароль</div>
              ) : null}
              <div className={cl.buttonWrapper}>
                <Button className={cl.loginButton} onClick={login}>
                  Увійти
                </Button>
              </div>
            </div>
          </form>
        </Info>
      </Wrapper>
    </div>
  );
};

export default LoginForm;
