import styled from "styled-components";
import GithubLogo from "/src/assets/github.svg";
import Modal from "./modal/modal";
import { useContext, useState } from "react";
import LoginForm from "./login-form/login-form";
import RegistrationForm from "./registration-form/registration-form";
import { AuthContext } from "../context";

interface Props {
  onChangeContent: (page: string) => void;
}

const Logo = styled.img`
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const NavBar = ({ onChangeContent }: Props) => {
  const { setAuthData } = useContext<any>(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#Editor"
                onClick={() => onChangeContent("Editor")}
                title="Editor in the circuit sandbox"
              >
                Редактор
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#MyCircuits"
                onClick={() => onChangeContent("MyCircuits")}
                title="My circuits list"
              >
                Мої схеми
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#Examples"
                onClick={() => onChangeContent("Examples")}
                title="View example circuits"
              >
                Приклади
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#Help"
                onClick={() => onChangeContent("Help")}
                title="Help center"
              >
                Допомога
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#Profile"
              onClick={() => {
                onChangeContent("Profile");
              }}
              title="Profile"
            >
              Профіль
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#Logout"
              onClick={() => {
                setAuthData({ isAuth: false, profile: null, token: null });
                localStorage.setItem("dyplomToken", null);
                onChangeContent("Home");
              }}
              title="Logout form"
            >
              Вийти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
