import { ImageResource } from "../../common/image.resource";
import { LogicCircuitElement } from "../../logic/interfaces";
import { CircuitItem } from "../Examples";
import { v4 as uuidv4 } from "uuid";

export function getDragNDropHandlers({
  isRunning,
  circuit,
  setCircuit,
}: {
  isRunning: boolean;
  circuit: CircuitItem[];
  setCircuit: React.Dispatch<React.SetStateAction<CircuitItem[]>>;
}): {
  dragStartHandler: (
    event: React.DragEvent<HTMLDivElement>,
    id: string,
    componentType: string
  ) => void;
  dropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
} {
  const getExistingCircuitItemById = (id: string): CircuitItem | null => {
    return (
      circuit.find((item) => item.id === id && item.addedToPlayArea) || null
    );
  };

  const addNewCircuitItemToEditor = ({
    componentType,
    coordinates,
  }: {
    componentType: LogicCircuitElement;
    coordinates: { x: number; y: number };
  }): CircuitItem => {
    const newItem = {
      id: uuidv4(),
      type: componentType,
      src: ImageResource[componentType],
      addedToPlayArea: true,
      ...coordinates,
      outputHigh: componentType === LogicCircuitElement.NOT,
    };

    setCircuit((previous) => [...previous, newItem]);

    return newItem;
  };

  const setDraggingMetadata = (
    event: React.DragEvent<HTMLDivElement>,
    data: { id: string; componentType: string }
  ): void => {
    event.dataTransfer.setData("id", data.id);
    event.dataTransfer.setData("componentType", data.componentType);
  };

  const getDraggingMetadata = (
    event: React.DragEvent<HTMLDivElement>
  ): {
    id: string;
    componentType: LogicCircuitElement;
    coordinates: {
      x: number;
      y: number;
    };
  } => {
    const id = event.dataTransfer.getData("id");
    const componentType = event.dataTransfer.getData(
      "componentType"
    ) as LogicCircuitElement;

    return {
      id,
      componentType: LogicCircuitElement[componentType],
      coordinates: {
        x: event.clientX,
        y: event.clientY,
      },
    };
  };

  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    id: string,
    componentType: string
  ): void => setDraggingMetadata(event, { id, componentType });

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.currentTarget.id !== "playArea") return;

    const { id, componentType, coordinates } = getDraggingMetadata(event);
    if (!componentType) return;

    const existingItem = getExistingCircuitItemById(id);
    if (existingItem) Object.assign(existingItem, coordinates);
    else addNewCircuitItemToEditor({ componentType, coordinates });
  };

  return {
    dragStartHandler,
    dropHandler,
  };
}
