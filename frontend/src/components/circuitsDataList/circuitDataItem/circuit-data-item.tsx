import { useContext } from "react";
import { CircuitService } from "../../../API/circuit.service";
import { ArrowItem, CircuitItem } from "../../Examples";
import cl from "./circuit-data-item.module.css";
import { AuthContext } from "../../../context";

export const CircuitDataItem = ({
  circuitData,
  importContent,
  onOpenClick,
  isDeleteButtonVisible = false,
}: {
  circuitData: {
    id: number;
    logo: string;
    label: string;
    description: string;
    schema: string;
  };
  importContent: (circuit: CircuitItem[], arrows: ArrowItem[]) => void;
  onOpenClick: any;
  isDeleteButtonVisible?: boolean;
}) => {
  const { authData } = useContext(AuthContext);

  function handleOpen(e: any) {
    e.preventDefault();
    const { circuit, arrows } = JSON.parse(circuitData.schema);
    console.log({ circuit, arrows, circuitData, importContent });
    importContent(circuit, arrows);
    onOpenClick();
  }

  async function handleDelete(e: any) {
    e.preventDefault();
    await CircuitService.deleteUserCircuit(authData.token, circuitData.id);
  }

  return (
    <div className={cl.wrapper}>
      <div className={cl.logoWrapper}>
        <img className={cl.logo} src={circuitData.logo} />
      </div>
      <div className={cl.textBlock}>
        <h3>{circuitData.label}</h3>
        <div className={cl.description}>
          &nbsp;&nbsp;{circuitData.description}
        </div>
      </div>
      <div className={cl.buttonWrapper}>
        <button className={cl.openButton} onClick={handleOpen}>
          Відкрити
        </button>
        {isDeleteButtonVisible && (
          <button className={cl.deleteButton} onClick={handleDelete}>
            Видалити
          </button>
        )}
      </div>
    </div>
  );
};

export default CircuitDataItem;
