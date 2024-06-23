import { useContext, useEffect, useState } from "react";
import cl from "./save-circuit.module.css";
import { FileService } from "../../../API/file.service";
import { AuthContext } from "../../../context";
import { ArrowItem, CircuitItem } from "../../Examples";
import { CircuitService } from "../../../API/circuit.service";

const SaveCircuitForm = (data: {
  circuitData: { circuit: CircuitItem[]; arrows: ArrowItem[] };
  setSaveModal: any;
}) => {
  const { authData } = useContext(AuthContext);
  const [circuitData, setCircuitData] = useState<{
    logo: string;
    label: string;
    description: string;
    circuit: CircuitItem[];
    arrows: ArrowItem[];
    // schema: string;
  }>({
    logo: "http://localhost:3000/static/no-circuit-photo.jpeg",
    label: "",
    description: "",
    circuit: data.circuitData.circuit,
    arrows: data.circuitData.arrows,
    // schema: JSON.stringify(data.circuitData),
  });

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      if (e.clipboardData) {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              const formData = new FormData();
              formData.append("file", file);

              try {
                const url = await FileService.uploadImage(formData);
                setCircuitData((prevData) => ({ ...prevData, logo: url }));
              } catch (error) {
                console.error("Error while uploading avatar:", error);
              }
            }
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  const handleChangeAvatar = async (e: any) => {
    e.preventDefault();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const url = await FileService.uploadImage(formData);
        setCircuitData({ ...circuitData, logo: url });
      } catch (error) {
        console.error("Error while uploading avatar:", error);
      }
    };
  };

  const handleSaveCircuit = async (e: any) => {
    e.preventDefault();

    try {
      await CircuitService.saveCircuit(authData.token, {
        ...circuitData,
        circuit: data.circuitData.circuit,
        arrows: data.circuitData.arrows,
      });

      data.setSaveModal(false);
    } catch (err) {}
  };

  return (
    <div className={cl.containerWrapper}>
      <div className={cl.profileInfo}>
        <img className={cl.logo} src={circuitData?.logo} alt="User Avatar" />
        <button
          className={cl.changeAvatarButton}
          onClick={(e) => handleChangeAvatar(e)}
        >
          Змінити
        </button>
      </div>
      <form className={cl.profileForm}>
        <input
          className={cl.input}
          type="text"
          placeholder="Назва"
          value={circuitData?.label}
          onChange={(e) => {
            setCircuitData({ ...circuitData, label: e.target.value });
          }}
        />
        <textarea
          className={cl.textarea}
          placeholder="Опис"
          value={circuitData?.description || ""}
          onChange={(e) => {
            setCircuitData({ ...circuitData, description: e.target.value });
          }}
        ></textarea>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            className={cl.changeAvatarButton}
            onClick={(e) => handleSaveCircuit(e)}
          >
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
};

export default SaveCircuitForm;
