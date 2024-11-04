import express from "express";
import * as userController from "../controllers/userController";

const adminRouter = express.Router();

adminRouter.post("/register", async (req, res) => {
  try {
    const { email, password, senderName, senderAddress } = req.body;
    const registrationResponse = await userController.register(
      {
        email,
        password,
        senderName,
        senderAddress,
      },
      true
    );
    res.status(200).json(registrationResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while registering admin.`,
      details: error,
    });
  }
});

export default adminRouter;
