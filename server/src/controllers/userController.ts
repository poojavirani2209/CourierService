import bcrypt from "bcryptjs";
import { NewUser, UserLoginDetails } from "../types/user";
import { addAdminUser, addNewUser, findUserByEmail } from "../models/user";
import { v4 as uuidv4 } from "uuid";

export async function register(userDetails: NewUser, isAdmin: boolean) {
  const { email, password, senderName, senderAddress } = userDetails;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return `A User with same email is already registered. Use a different email to register a new user.`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (isAdmin) {
      await addAdminUser({
        email,
        password: hashedPassword,
        senderName,
        senderAddress,
      });
    } else {
      await addNewUser({
        email,
        password: hashedPassword,
        senderName,
        senderAddress,
      });
    }
    console.log(`Inserted user successfully ${userDetails.email}`);
    return `User registered successfully`;
  } catch (error) {
    console.error(`Error occurred while adding a new user in users table`);
    throw error;
  }
}

export async function login(loginDetails: UserLoginDetails) {
  const { email, password } = loginDetails;

  try {
    const user = await findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(
        `Logged in successfully for user with email ${loginDetails.email}`
      );
      return user;
    } else {
      return `Invalid credentials`;
    }
  } catch (error) {
    console.error(`Error occurred while logging in.`);
    throw error;
  }
}
