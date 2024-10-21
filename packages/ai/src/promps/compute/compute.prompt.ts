import { computeInitialContextPrompt } from "./initialContext";
import { computeInputPrompt } from "./input";
import { computeOutputPrompt } from "./output";

export const computePrompt = (input: string) => {
  return `
  ${computeInitialContextPrompt(input)}
  ${computeInputPrompt(input)}
  ${computeOutputPrompt(input)}
  `;
};
