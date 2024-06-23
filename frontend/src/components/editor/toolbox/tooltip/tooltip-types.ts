export interface TruthTableDataToDisplay {
  headers: string[];
  rows: (number | string)[][];
}

export interface DataToDisplay {
  name: string;
  description: string;
  truthTable?: TruthTableDataToDisplay;
}
