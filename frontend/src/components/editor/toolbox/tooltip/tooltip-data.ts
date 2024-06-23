import {
  LogicCircuitElement,
  TruthMatrixForElements,
} from "../../../../logic/interfaces";
import { DataToDisplay } from "./tooltip-types";

export const dataToDisplayForElement: Record<
  LogicCircuitElement,
  DataToDisplay
> = {
  [LogicCircuitElement.LED]: {
    name: "Output LED",
    description: "Lights up when receiving a signal.",
  },
  [LogicCircuitElement.INPUT]: {
    name: "Input Switch",
    description: "Outputs a signal when turned on.",
  },
  [LogicCircuitElement.AND]: {
    name: "AND gate",
    description: "Only outputs when both inputs are high.",
    truthTable: {
      headers: ["Input A", "Input B", "Output"],
      rows: TruthMatrixForElements[LogicCircuitElement.AND],
    },
  },
  [LogicCircuitElement.NOT]: {
    name: "NOT gate",
    description: "Outputs the opposite of the input.",
    truthTable: {
      headers: ["Input", "Output"],
      rows: TruthMatrixForElements[LogicCircuitElement.NOT],
    },
  },
  [LogicCircuitElement.OR]: {
    name: "OR gate",
    description: "Outputs a signal when either inputs are high.",
    truthTable: {
      headers: ["Input A", "Input B", "Output"],
      rows: TruthMatrixForElements[LogicCircuitElement.OR],
    },
  },
  [LogicCircuitElement.XOR]: {
    name: "XOR gate",
    description: "Outputs a signal when only 1 of the inputs is high.",
    truthTable: {
      headers: ["Input A", "Input B", "Output"],
      rows: TruthMatrixForElements[LogicCircuitElement.XOR],
    },
  },
  [LogicCircuitElement.NAND]: {
    name: "NAND gate",
    description: "Outputs a signal unless both outputs are high.",
    truthTable: {
      headers: ["Input A", "Input B", "Output"],
      rows: TruthMatrixForElements[LogicCircuitElement.NAND],
    },
  },
  [LogicCircuitElement.NOR]: {
    name: "NOR gate",
    description: "Outputs a signal only when both outputs are low.",
    truthTable: {
      headers: ["Input A", "Input B", "Output"],
      rows: TruthMatrixForElements[LogicCircuitElement.NOR],
    },
  },
  [LogicCircuitElement.XNOR]: {
    name: "XNOR gate",
    description:
      "Outputs a signal when both inputs are high or both inputs are low.",
    truthTable: {
      headers: ["Input A", "Input B", "Output"],
      rows: TruthMatrixForElements[LogicCircuitElement.XNOR],
    },
  },
};
