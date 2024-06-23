import axios from "axios";
import { ArrowItem, CircuitItem } from "../components/Examples";

export class CircuitService {
  static async saveCircuit(
    token: string,
    data: {
      label: string;
      description: string;
      logo: string;
      circuit: CircuitItem[];
      arrows: ArrowItem[];
    }
  ) {
    const response = await axios.post(
      `http://localhost:3000/circuit/save?access_token=${token}`,
      {
        ...data,
        schema: JSON.stringify({ circuit: data.circuit, arrows: data.arrows }),
      }
    );

    return response.data;
  }

  static async getUserCircuitsList(token: string) {
    const response = await axios.get(
      `http://localhost:3000/circuit?access_token=${token}`
    );

    return response.data;
  }

  static async deleteUserCircuit(
    token: string,
    circuitId: number
  ): Promise<void> {
    await axios.delete(
      `http://localhost:3000/circuit/${circuitId}?access_token=${token}`
    );
  }
}
