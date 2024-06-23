export enum LogicCircuitElement {
  LED = "LED",
  INPUT = "INPUT",
  AND = "AND",
  NOT = "NOT",
  OR = "OR",
  XOR = "XOR",
  NAND = "NAND",
  NOR = "NOR",
  XNOR = "XNOR",
}
export type TruthMatrix = number[][];

export const TruthMatrixForElements: Record<LogicCircuitElement, TruthMatrix> =
  {
    [LogicCircuitElement.AND]: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    [LogicCircuitElement.NOT]: [
      [0, 1],
      [1, 0],
    ],
    [LogicCircuitElement.OR]: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    [LogicCircuitElement.XOR]: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ],
    [LogicCircuitElement.NAND]: [
      [0, 0, 1],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ],

    [LogicCircuitElement.NOR]: [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
    [LogicCircuitElement.XNOR]: [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    [LogicCircuitElement.LED]: [],
    [LogicCircuitElement.INPUT]: [],
  };
