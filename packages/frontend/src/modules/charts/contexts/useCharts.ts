import { useContext } from "react";
import { ChartsContext } from "./ChartsContext";

export const useCharts = () => {
  return useContext(ChartsContext);
};
