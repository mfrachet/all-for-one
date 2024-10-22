import { createClient } from "@clickhouse/client";

export const clickhouseClient = createClient({
  host: "http://localhost:8123",
  username: "all",
  password: "all12345",
  database: "all",
});
