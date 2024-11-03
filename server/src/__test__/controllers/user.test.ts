import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { NewUser } from "../../types/user";
import { addNewUser, findUserByEmail } from "../../models/user";
import { register } from "../../controllers/userController";

jest.mock(`bcryptjs`);
jest.mock(`../../models/user`);
jest.mock(`uuid`, () => ({
  v4: jest.fn(),
}));

describe(`Register a new user`, () => {
  const userDetails: NewUser = {
    email: `user1@abc.com`,
    password: `password123`,
    senderName: `User1`,
    senderAddress: `123 street,India`,
  };

  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue(`mockedUUID`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`Given new user details with a fresh email, when registering user, then it should register a user successfully`, async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue(`hashedPassword`);
    (addNewUser as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await register(userDetails);

    expect(bcrypt.hash).toHaveBeenCalledWith(userDetails.password, 10);
    expect(addNewUser).toHaveBeenCalledWith({
      id: `mockedUUID`,
      email: userDetails.email,
      password: `hashedPassword`,
      senderName: userDetails.senderName,
      senderAddress: userDetails.senderAddress,
    });
    expect(result).toBe(`User registered successfully`);
  });

  test(`Given a user already exists with provided email, when registering user, then it should throw an error.`, async () => {
    (findUserByEmail as jest.Mock).mockResolvedValueOnce(userDetails);

    const result = await register(userDetails);

    expect(findUserByEmail).toHaveBeenCalledWith(userDetails.email);
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(addNewUser).not.toHaveBeenCalled();
    expect(result).toBe(
      `A User with same email is already registered. Use a different email to register a new user.`
    );
  });

  test(`Given error occurs in adding user to data, when registering user, then it should throw an error`, async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue(`hashedPassword`);
    (addNewUser as jest.Mock).mockRejectedValueOnce(
      new Error(`Insertion failed`)
    );

    await expect(register(userDetails)).rejects.toThrow(`Insertion failed`);
    expect(bcrypt.hash).toHaveBeenCalledWith(userDetails.password, 10);
    expect(addNewUser).toHaveBeenCalled();
  });
});
