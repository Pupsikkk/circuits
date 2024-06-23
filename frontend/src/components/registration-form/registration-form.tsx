import React, { useContext, useState } from "react";
import MyInput from "../input/my-input";
import Button from "../button/button";
import cl from "./registration-form.module.css";
import { AuthContext } from "../../context";
import { UserService } from "../../API/user.service";
import styled from "styled-components";
import ChipStill from "/src/assets/chip.png";

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

// const Content = styled.div`
//   display: grid;
// `;

// const Title = styled.h1`
//   font-size: 1.5em;
//   text-align: center;
//   color: #25a07f;
// `;

// const Image = styled.img`

//   position: relative;

//   margin-left: auto;
//   margin-right: auto;
//   width: auto;
//   height auto;
// `;

// const CpuBackground = styled.div<{ animated: boolean }>`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   background-image: url(${(props) => ChipStill});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: contain;
// `;

const RegistrationForm = ({ onChangeContent }: any) => {
  const { authData, setAuthData } = useContext<any>(AuthContext);

  const [err, setErr] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    lastname: "",
    password: "",
    email: "",
  });

  async function register(e: any) {
    e.preventDefault();

    try {
      const { profile, token } = await UserService.register(registrationData);

      setAuthData({ ...authData, isAuth: true, token, profile });
      localStorage.setItem("dyplomToken", token);

      setRegistrationData({
        name: "",
        lastname: "",
        password: "",
        email: "",
      });
      setErr(null);
      onChangeContent("Editor");
    } catch (err: any) {
      console.log(err?.response?.data);
      if (err?.response?.data?.statusCode === 400)
        setErr(err.response.data.message);
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
              <h1 style={{ color: "black" }}>Реєстрація</h1>
            </div>
            <div className={cl.inputs}>
              <div style={{ display: "flex" }}>
                <MyInput
                  value={registrationData.name}
                  onChange={(e: any) =>
                    setRegistrationData({
                      ...registrationData,
                      name: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Імʼя"
                />
                <div style={{ width: "100px" }}></div>
                <MyInput
                  value={registrationData.lastname}
                  onChange={(e: any) =>
                    setRegistrationData({
                      ...registrationData,
                      lastname: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Прізвище"
                />
              </div>
              <MyInput
                autocomplete="email"
                value={registrationData.email}
                onChange={(e: any) =>
                  setRegistrationData({
                    ...registrationData,
                    email: e.target.value,
                  })
                }
                type="text"
                placeholder="Електронна пошта"
              />
              <MyInput
                autocomplete="current-password"
                value={registrationData.password}
                type="password"
                onChange={(e: any) =>
                  setRegistrationData({
                    ...registrationData,
                    password: e.target.value,
                  })
                }
                placeholder="Пароль"
              />
              {err && <div className={cl.errorMessage}>{err}</div>}
              <div className={cl.buttonWrapper}>
                <Button className={cl.registrationButton} onClick={register}>
                  Зареєструвати
                </Button>
              </div>
            </div>
          </form>
        </Info>
      </Wrapper>
    </div>
  );
};

export default RegistrationForm;
