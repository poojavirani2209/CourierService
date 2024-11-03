import { getDbClient } from "../database/database";
import { UserDetails } from "../types/user";

export async function createUserTable(): Promise<void> {
  try {
    const result = await getDbClient().query(
      `
             CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255),
    sender_address TEXT
);

          `
    );
    console.log(`Users table created.`);
  } catch (error) {
    if (error.code == `42P07`) {
      console.error(`Table already exists`);
    } else {
      console.error(`Error creating users table: ${error}`);
      throw error;
    }
  }
}

export async function addNewUser(user: UserDetails): Promise<void> {
  let { id, email, password, senderName, senderAddress } = user;
  try {
    const result = await getDbClient().query(
      "INSERT INTO users (id, email, password, sender_name, sender_address) VALUES ($1, $2, $3, $4, $5)",
      [id, email, password, senderName, senderAddress]
    );
    return;
  } catch (error) {
    console.error(`Error inserting user: ${error}`);
    throw error;
  }
}

export async function findUserByEmail(
  email: string
): Promise<UserDetails | null> {
  try {
    const result = await getDbClient().query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error(`Error finding user by email in table: ${error}`);
    throw error;
  }
}
