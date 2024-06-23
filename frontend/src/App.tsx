import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Editor from "./components/editor/editor";
import Examples from "./components/Examples";
import HelpCenter from "./components/helpCenter/help-center";
import { CircuitItem, ArrowItem } from "./components/Examples";
import { AuthContext } from "./context";
import { UserService } from "./API/user.service";
import RegistrationForm from "./components/registration-form/registration-form";
import LoginForm from "./components/login-form/login-form";
import Home from "./components/home/home";
import ProfilePage from "./components/profile/profile";
import MyCircuitsPage from "./components/myCircuitsPage/myCircuitsPage";

function App() {
  const [authData, setAuthData] = useState<{
    isAuth: boolean;
    token: string;
    profile: any;
  }>({
    isAuth: false,
    token: null,
    profile: null,
  });

  const [currentPage, setCurrentPage] = useState("Home");
  const [circuit, setCircuit] = useState<CircuitItem[]>([]);
  const [arrows, setArrows] = useState<ArrowItem[]>([]);

  function blockScroll() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  function unblockScroll() {
    document.body.style.overflow = "visible";
    document.documentElement.style.overflow = "visible";
  }

  useEffect(() => {
    (async function () {
      let token = localStorage.getItem("dyplomToken");

      let profile = null,
        isAuth = false;
      try {
        if (token) {
          profile = await UserService.getProfile(token);
          isAuth = true;
          setCurrentPage("Profile");
        }
      } catch (err) {
        token = null;
      }

      setAuthData({ ...authData, profile, token, isAuth });
    })();
  }, []);

  const handleCircuitImport = (circuit: CircuitItem[], arrows: ArrowItem[]) => {
    console.log("importContent", { circuit, arrows });
    setCircuit(circuit);
    setArrows(arrows);
    setCurrentPage("Editor");
  };

  blockScroll();
 
  return (
    <div>
      <AuthContext.Provider
        value={
          {
            authData,
            setAuthData,
          } as any
        }
      >
        {authData.isAuth ? (
          <div>
            <NavBar onChangeContent={(page) => setCurrentPage(page)} />
            {currentPage === "Editor" &&
              (() => {
                return (
                  <Editor
                    importContent={handleCircuitImport}
                    circuit={circuit}
                    setCircuit={setCircuit}
                    arrows={arrows}
                    setArrows={setArrows}
                  />
                );
              })()}
            {currentPage === "Examples" && (
              <Examples importContent={handleCircuitImport} />
            )}
            {currentPage === "Help" && <HelpCenter />}
            {currentPage === "Profile" && <ProfilePage />}
            {currentPage === "MyCircuits" &&
              (() => {
                unblockScroll();
                return <MyCircuitsPage importContent={handleCircuitImport} />;
              })()}
          </div>
        ) : (
          <div>
            {currentPage === "Home" && (
              <Home onChangeContent={(page) => setCurrentPage(page)} />
            )}
            {currentPage === "Login" && (
              <LoginForm
                onChangeContent={(page: any) => setCurrentPage(page)}
              />
            )}
            {currentPage === "Register" && (
              <RegistrationForm
                onChangeContent={(page: any) => setCurrentPage(page)}
              />
            )}
          </div>
        )}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
