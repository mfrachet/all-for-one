import { exclusionOutput, expectedOutput } from "./output";
import { stripeTableDDL } from "./stripe.context";

export const generateClickhouseQuery = (input: string) => `
    Your scope is limited to the DDL passed in this context: "${stripeTableDDL}".
    Every question that is not related to this DDL will end up with the following preformatted answer: "${exclusionOutput}".
    You will generate a JSON of type "ExpectedSqlOutput" from the following type definition: "${expectedOutput}", nothing else is authorized.
    The JSON should be strict and valid, not containing any escaping characters, markdown or code blocks.
    The sql query should provide columns matching the "ExpectedSqlColumns" type provided above.
    The sql query should be a valid ClickHouse SQL query only and strictly following the DDL passed in context.

    Here's the question: "${input}".
`;
