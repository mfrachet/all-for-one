import { createContext } from "react";
import { Suggestion } from "../types";

export const SuggestionsContext = createContext<Suggestion[]>([]);
