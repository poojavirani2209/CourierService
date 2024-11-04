import { Pool } from "pg";
import dotenv from "dotenv";
import { createUserTable } from "../models/user";
import { createShipmentTable } from "../models/shipment";

dotenv.config();

let dbClient: Pool;

export async function createDatabase() {
  const { DATABASE_URL, DATABASE_NAME } = process.env;
  const dbName = DATABASE_NAME || "courierService";

  dbClient = new Pool({
    connectionString: DATABASE_URL,
    database: "postgres",
  });

  try {
    await dbClient.query(`CREATE DATABASE ${dbName}`);
    console.log(`Database ${dbName} created successfully.`); // Need a different log file
    await initializeTables();
  } catch (error) {
    if (error.code == "42P04") {
      console.error(`The Database already exists`);
      await initializeTables();
    } else {
      console.error(`Error occurred while creating database: ${error}`);
      await dbClient.end();
      throw error;
    }
  }
}

const initializeTables = async () => {
  await createUserTable();
  await createShipmentTable();
};

export const getDbClient = () => {
  if (!dbClient) {
    throw new Error(
      "Database client is not initialized. Make sure to call createDatabase first."
    );
  }
  return dbClient;
};
