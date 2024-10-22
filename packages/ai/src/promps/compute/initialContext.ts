import { stripContextPrompt } from "./stripe/stripe.context";

export const computeInitialContextPrompt = (input: string) => {
  return `
    A user is asking for a data computation.
    ${stripContextPrompt.join("\n")}
    Your scope is limited to the DDL passed in this context.
    Everything else will end up with the following preformatted answer: { "type" :"paragraph", "data": "Not allowed to answer this question."}. Escaping characters, markdown or code blocks are prohibited from the answer.
  `;
};
