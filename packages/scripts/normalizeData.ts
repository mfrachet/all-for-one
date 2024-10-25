import { ClickHouseClient, createClient } from "@clickhouse/client";
import dotenv from "dotenv";

dotenv.config();

const CLICKHOUSE_DB = process.env.CLICKHOUSE_DB;
const clickhouseClient: ClickHouseClient = createClient({
  host: process.env.CLICKHOUSE_HOST,
  username: process.env.CLICKHOUSE_USER,
  password: process.env.CLICKHOUSE_PASSWORD,
  database: CLICKHOUSE_DB,
});

const normalizeData = async () => {
  try {
    // 1. Drop the new_customers table if it exists
    await clickhouseClient.command({
      query: `DROP TABLE IF EXISTS all.new_customers`,
    });
    console.log("Dropped new_customers if it existed.");

    // 2. Create the new_customers table with data copied from customers and additional fields
    await clickhouseClient.command({
      query: `
          CREATE TABLE all.new_customers
          ENGINE = MergeTree()
          ORDER BY id
          AS
          SELECT 
              *,
              if(JSONExtractString(metadata, 'id') != '', JSONExtractString(metadata, 'id'), NULL) AS communityId,
              if(JSONExtractString(metadata, 'name') != '', JSONExtractString(metadata, 'name'), NULL) AS communityName,
              if(JSONExtractString(metadata, 'subdomain') != '', JSONExtractString(metadata, 'subdomain'), NULL) AS communitySubdomain
          FROM all.customers
          WHERE metadata IS NOT NULL AND length(metadata) > 2;
      `,
    });
    console.log("Created new_customers with additional fields.");

    // 3. Drop the original customers table
    await clickhouseClient.command({
      query: `DROP TABLE IF EXISTS all.customers`,
    });
    console.log("Dropped customers table.");

    // 4. Rename new_customers to customers
    await clickhouseClient.command({
      query: `RENAME TABLE all.new_customers TO all.customers`,
    });
    console.log("Renamed new_customers to customers.");

    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

normalizeData().catch(console.error);
