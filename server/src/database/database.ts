import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let dbClient: Pool;

export async function createDatabase() {
  const { DATABASE_URL, DATABASE_NAME } = process.env;
  const dbName = DATABASE_NAME || "courier";

  dbClient = new Pool({
    connectionString: DATABASE_URL,
    database: dbName,
  });

  try {
    await dbClient.query(`CREATE DATABASE ${dbName}`);
    console.log(`Database ${dbName} created successfully.`); // Need a different log file
  } catch (error) {
    console.error(`Error occurred while creating database: ${error}`);
  } finally {
    await dbClient.end();
  }
}

export default dbClient;
