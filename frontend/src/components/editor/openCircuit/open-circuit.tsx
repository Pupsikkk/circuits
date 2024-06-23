import { ArrowItem, CircuitItem } from "../../Examples";
import CircuitDataList from "../../circuitsDataList/circuits-data-list";
import cl from "./open-circuit.module.css";

export const OpenCircuit = (props: {
  importContent: (circuit: CircuitItem[], arrows: ArrowItem[]) => void;
  setOpenModal: any;
}) => {
  return (
    <div className={cl.wrapper}>
      <CircuitDataList
        onOpenClick={() => {
          props.setOpenModal();
        }}
        importContent={props.importContent}
      />
    </div>
  );
};

export default OpenCircuit;
