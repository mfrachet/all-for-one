import { tables } from "../__context__/clickhouse.context";
import { expectedOutput } from "./output";

export const getSuggestionsPrompt = (input: string) => `
    Your scope is limited to the DDL passed in this context: "${tables}".
    You will generate a JSON of type "Suggestions" from the following type definition: "${expectedOutput}", nothing else is authorized.
    For example, a valid output is: [{"title": "Subscription status count", "type": "paragraph" }] .
    The JSON should be strict and valid, not containing any escaping characters, new lines, markdown or code blocks.
    You will suggest new charts name that don't exist in the input you're provided with.
    When the type is "paragraph", the result of the chart should only be one number, nothing else.
    Here are the existing charts: "${input}".
`;
