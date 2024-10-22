import { expectedOutput } from "./output";
import { stripeTableDDL } from "./stripe.context";

//    Every question that is not related to this DDL will end up with the following preformatted answer: "${exclusionOutput}".

export const generateClickhouseQuery = (input: string) => `
    Your scope is limited to the DDL passed in this context: "${stripeTableDDL}".
    You will generate a JSON of type "ExpectedSqlOutput" from the following type definition: "${expectedOutput}", nothing else is authorized.
    The JSON should be strict and valid, not containing any escaping characters, new lines, markdown or code blocks.
    The sql query should provide columns matching the "ExpectedSqlColumns" type provided above.
    The sql query should be a valid ClickHouse SQL query only and strictly following the DDL passed in context.
    The sql query should always be ordered by the "type" column first.

    Here's the question: "${input}".
`;
