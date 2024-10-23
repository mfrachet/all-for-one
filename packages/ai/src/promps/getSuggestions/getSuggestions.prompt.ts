import { tables } from "../__context__/clickhouse.context";
import { expectedOutput } from "./output";

export const getSuggestionsPrompt = (input: string) => `
    Your scope is limited to the DDL passed in this context: "${tables}".
    You will be provided with a string containing already existing charts and you should suggest new ones based on the context you have.
    You should not suggest charts that already exist.
    You will generate a JSON of type "Suggestions" which is an array of objects from the following type definition: "${expectedOutput}", it should be an array, not an object.
    When the type is "paragraph", the result should only be one number, nothing else.
    The JSON should be strict and valid, not containing any escaping characters, new lines, markdown or code blocks.
    Here are the existing charts: "${input}".
`;
