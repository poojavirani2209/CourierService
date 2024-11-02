import { Pool } from "pg";
import { createDatabase } from "../../database/database";

jest.mock("pg");

describe("Database creation", () => {
  let dbClientMock: jest.Mocked<Pool>;

  beforeEach(() => {
    //MOCKS pg Pool
    dbClientMock = new Pool() as jest.Mocked<Pool>;
    (Pool as unknown as jest.Mock).mockImplementation(() => dbClientMock);

    //DUMMY CREDENTIALS
    process.env.DATABASE_URL = "postgres://user:password@localhost:5432/";
    process.env.DATABASE_NAME = "testdb";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`Given a fresh database name with proper creds to connect to db, when trying to create database, 
    then it should create a database successfully`, async () => {
    dbClientMock.query = jest.fn().mockResolvedValueOnce({});
    await createDatabase();

    expect(dbClientMock.query).toHaveBeenCalledWith(`CREATE DATABASE testdb`);
    expect(dbClientMock.end).toHaveBeenCalled();
  });

  test("Given a db already exists, when trying to create database, then it should log an error when database creation fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    dbClientMock.query = jest
      .fn()
      .mockRejectedValueOnce(new Error("Database already exists"));

    await expect(createDatabase()).rejects.toThrow("Database already exists");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error occurred while creating database:")
    );
    expect(dbClientMock.end).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  test("Given a fresh database name with improper creds to connect to db, then it should log an error when database creation fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    dbClientMock.query = jest
      .fn()
      .mockRejectedValueOnce(new Error("Credentials are incorrect"));

      await expect(createDatabase()).rejects.toThrow("Credentials are incorrect");


    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error occurred while creating database:")
    );
    expect(dbClientMock.end).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
