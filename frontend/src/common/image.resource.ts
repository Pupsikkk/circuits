// Multimedia imports
import InvertedChip from "/src/assets/chip2.png";
import LEDOff from "/src/assets/gates/lof.png";
import SwitchOff from "/src/assets/gates/sof.png";
import ANDGate from "/src/assets/gates/and.png";
import NOTGate from "/src/assets/gates/not.png";
import ORGate from "/src/assets/gates/orr.png";
import XORGate from "/src/assets/gates/xor.png";
import LEDOn from "/src/assets/gates/lon.png";
import SwitchOn from "/src/assets/gates/son.png";
import NANDGate from "/src/assets/gates/nan.png";
import NORGate from "/src/assets/gates/nor.png";
import XNORGate from "/src/assets/gates/xno.png";
import { LogicCircuitElement } from "../logic/interfaces";

export const ImageResource = {
  INVERTED_CHIP: InvertedChip,
  "LED-ON": LEDOn,
  "INPUT-ON": SwitchOn,
  [LogicCircuitElement.LED]: LEDOff,
  [LogicCircuitElement.INPUT]: SwitchOff,
  [LogicCircuitElement.AND]: ANDGate,
  [LogicCircuitElement.NOT]: NOTGate,
  [LogicCircuitElement.OR]: ORGate,
  [LogicCircuitElement.XOR]: XORGate,
  [LogicCircuitElement.NAND]: NANDGate,
  [LogicCircuitElement.NOR]: NORGate,
  [LogicCircuitElement.XNOR]: XNORGate,
};
