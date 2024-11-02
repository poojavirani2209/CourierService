import express from "express";
import { createDatabase } from "./database/database";

/**
 * Create a new express server application listening on the port specified.
 */
let port = 8887;
let app = express();

app.use(express.json());

export const startApp = async () => {
  app.listen(port, async () => {
    console.log(`Server has started and listening at port ${port}`);
    try {
      await createDatabase();
    } catch (error: any) {
      console.log(`Error occurred while setup ${error}`);
      throw error;
    }
  });
};

export default app;
