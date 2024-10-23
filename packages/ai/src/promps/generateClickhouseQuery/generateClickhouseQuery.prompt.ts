import { expectedOutput, expectedSqlColumns } from "./output";
import { tables } from "../__context__/clickhouse.context";

//    Every question that is not related to this DDL will end up with the following preformatted answer: "${exclusionOutput}".

export const generateClickhouseQuery = (input: string) => `
    Your scope is limited to the DDL passed in this context: "${tables}".
    You will generate a JSON of type "ExpectedSqlOutput" from the following type definition: "${expectedOutput}", nothing else is authorized.
    The JSON should be strict and valid, not containing any escaping characters, new lines, markdown or code blocks.
    The sql query should provide columns matching the next criteria: ${expectedSqlColumns}.
    The sql query should be a valid ClickHouse SQL query only and strictly following the DDL passed in context.
    The sql query should always be ordered by the "type" column first.
    Don't apply ORDER BY clause by default but only when really needed.

    Here's the question: "${input}".
`;
