import axios from "axios";
import { ClickHouseClient, createClient } from "@clickhouse/client";
import dotenv from "dotenv";
import dayjs from "dayjs"; // Install this package for date manipulation

// Load environment variables from .env file
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

async function parseJSONL(jsonlData: string): Promise<any[]> {
  // Split the JSONL data into individual lines
  const lines = jsonlData.split("\n").filter((line) => line.trim() !== "");

  // Parse each line as JSON and return an array of JSON objects
  const jsonArray = lines.map((line) => JSON.parse(line));

  return jsonArray;
}

// Function to get data from Mixpanel export API for a specific day
async function fetchDataFromMixpanel(
  fromDate: string,
  toDate: string
): Promise<any[]> {
  try {
    const response = await axios.get(MIXPANEL_API_URL!, {
      params: {
        from_date: fromDate,
        to_date: toDate,
        limit: 2,
      },
      auth: {
        username: MIXPANEL_SECRET || "", // Secret is used as the username
        password: "", // Password is left empty
      },
    });

    if (response.status === 200) {
      return parseJSONL(response.data);
    }
    return [];
  } catch (error) {
    console.error("Error fetching data from Mixpanel:", error);
    return [];
  }
}

// Function to insert data into ClickHouse
async function insertDataIntoClickHouse(data: any[]) {
  try {
    const totalEvents = data.length;
    const batchSize = 100;
    for (let i = 0; i < totalEvents; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      console.log(batch);

      const query = `
      INSERT INTO mixpanel_events (event_name, event_id, community_id, created_at)
      VALUES
      ${batch
        .map((item) => {
          return `('${item.event}', '${item.properties.$insert_id}', '${
            item.properties.communityId
          }', '${dayjs(item.properties.$mp_api_timestamp_ms).format(
            "YYYY-MM-DD HH:mm:ss"
          )}')`;
        })
        .join(",")}
    ;`;

      await clickhouseClient.command({
        query,
      });
    }

    console.log(`Data inserted successfully ${totalEvents}`);
  } catch (error) {
    console.error("Error inserting data into ClickHouse:", error);
  }
}

// Function to create the table if it doesn't exist
async function createTableIfNotExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS mixpanel_events (
      event_name String,
      event_id String,
      community_id String,
      created_at DateTime
    ) ENGINE = MergeTree()
    ORDER BY (event_name, created_at, community_id , event_id)
  `;
  await clickhouseClient.query({ query: createTableQuery });
  console.log("Table created if it did not exist");
}

// Main function to orchestrate data retrieval and insertion day by day
async function main() {
  await createTableIfNotExists();

  const fromDate = dayjs("2024-10-21"); // Customize your start date
  const today = dayjs().startOf("day"); // Get today's date

  let currentDate = fromDate;

  while (currentDate.isBefore(today.add(-1, "day"))) {
    const fromDateString = currentDate.format("YYYY-MM-DD");
    const toDateString = currentDate.add(1, "day").format("YYYY-MM-DD");

    console.log(`Fetching data from ${fromDateString} to ${toDateString}`);

    const data = await fetchDataFromMixpanel(fromDateString, toDateString);

    if (data.length > 0) {
      await insertDataIntoClickHouse(data);
    } else {
      console.log(`No data found for: ${fromDateString}`);
    }

    // Move to the next day
    currentDate = currentDate.add(1, "day");
  }

  console.log("Data ingestion completed");
}

main().catch(console.error);
