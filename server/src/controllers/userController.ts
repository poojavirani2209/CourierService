import bcrypt from "bcryptjs";
import { NewUser } from "../types/user";
import { addNewUser, findUserByEmail } from "../models/user";
import { v4 as uuidv4 } from "uuid";

export async function register(userDetails: NewUser) {
  const { email, password, senderName, senderAddress } = userDetails;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return `A User with same email is already registered. Use a different email to register a new user.`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await addNewUser({
      id: uuidv4(),
      email,
      password: hashedPassword,
      senderName,
      senderAddress,
    });
    console.log(`Inserted user successfully ${userDetails.email}`);
    return `User registered successfully`;
  } catch (error) {
    console.error(`Error occurred while adding a new user in users table`);
    throw error;
  }
}
