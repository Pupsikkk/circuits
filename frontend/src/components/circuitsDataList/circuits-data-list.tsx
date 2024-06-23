import { useContext, useEffect, useState } from "react";
import { CircuitService } from "../../API/circuit.service";
import { AuthContext } from "../../context";
import CircuitDataItem from "./circuitDataItem/circuit-data-item";
import { CircuitItem, ArrowItem } from "../Examples";

export const CircuitDataList = (props: {
  importContent: (circuit: CircuitItem[], arrows: ArrowItem[]) => void;
  onOpenClick: any;
  isDeleteButtonVisible?: boolean;
}) => {
  const { authData } = useContext(AuthContext);
  const [circuitsDataList, setCircuitsDataList] = useState([]);

  const isDeleteButtonVisible = props.isDeleteButtonVisible || false;

  useEffect(() => {
    (async () => {
      try {
        const circuits = await CircuitService.getUserCircuitsList(
          authData.token
        );

        setCircuitsDataList(circuits);

        setInterval(async () => {
          const circuits = await CircuitService.getUserCircuitsList(
            authData.token
          );

          if (circuits.length !== circuitsDataList.length)
            setCircuitsDataList(circuits);
        }, 1000);
      } catch (err) {}
    })();
  }, []);

  if (!circuitsDataList.length)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#25a07f" }}>У вас немає власних схем</h1>
      </div>
    );

  return (
    <div>
      {circuitsDataList.map((circuitData) => (
        <CircuitDataItem
          importContent={props.importContent}
          onOpenClick={props.onOpenClick}
          circuitData={circuitData}
          isDeleteButtonVisible={isDeleteButtonVisible}
        ></CircuitDataItem>
      ))}
    </div>
  );
};

export default CircuitDataList;
