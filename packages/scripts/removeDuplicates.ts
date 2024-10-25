import { ClickHouseClient, createClient } from "@clickhouse/client";
import dotenv from "dotenv";

dotenv.config();

const MIXPANEL_SECRET = process.env.MIXPANEL_SECRET;
const MIXPANEL_API_URL = process.env.MIXPANEL_API_URL;
const CLICKHOUSE_DB = process.env.CLICKHOUSE_DB;
const clickhouseClient: ClickHouseClient = createClient({
  host: process.env.CLICKHOUSE_HOST,
  username: process.env.CLICKHOUSE_USER,
  password: process.env.CLICKHOUSE_PASSWORD,
  database: CLICKHOUSE_DB,
});

const removeDuplicates = async () => {
  const queries = [
    `
        DELETE FROM all.subscriptions
        WHERE (_sdc_extracted_at, id) NOT IN (
            SELECT MAX(_sdc_extracted_at), id
            FROM all.subscriptions
            GROUP BY id
        );
        `,
    `
        DELETE FROM all.subscription_items
        WHERE (_sdc_extracted_at, id) NOT IN (
            SELECT MAX(_sdc_extracted_at), id
            FROM all.subscription_items
            GROUP BY id
        );
        `,
    `
        DELETE FROM all.products
        WHERE (_sdc_extracted_at, id) NOT IN (
            SELECT MAX(_sdc_extracted_at), id
            FROM all.products
            GROUP BY id
        );
        `,
    `
        DELETE FROM all.plans
        WHERE (_sdc_extracted_at, id) NOT IN (
            SELECT MAX(_sdc_extracted_at), id
            FROM all.plans
            GROUP BY id
        );
        `,
    `
        DELETE FROM all.customers
        WHERE (_sdc_extracted_at, id) NOT IN (
            SELECT MAX(_sdc_extracted_at), id
            FROM all.customers
            GROUP BY id
        );
        `,
    `
        DELETE FROM all.coupons
        WHERE (_sdc_extracted_at, id) NOT IN (
            SELECT MAX(_sdc_extracted_at), id
            FROM all.coupons
            GROUP BY id
        );
        `,
  ];

  await Promise.all(
    queries.map(async (query) => {
      await clickhouseClient.command({
        query,
      });
    })
  );
};

removeDuplicates().catch(console.error);
