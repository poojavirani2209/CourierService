import express from "express";
import * as shipmentController from "../controllers/shipmentController";

const shipmentRouter = express.Router();

shipmentRouter.post("/create", async (req, res) => {
  try {
    const { userId, recipientName, recipientAddress, shipmentDetails } =
      req.body;

    const shipmentCreationResponse = await shipmentController.createShipment({
      userId,
      recipientAddress,
      recipientName,
      shipmentDetails,
    });
    res.status(200).json(shipmentCreationResponse);
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while adding a new shipment.`,
      details: error,
    });
  }
});

shipmentRouter.get("/:trackingNumber", async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    console.log(trackingNumber)

    const shipmentDetails = await shipmentController.trackShipment(
      trackingNumber
    );
    res.status(200).json(shipmentDetails);
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while tracking a shipment.`,
      details: error,
    });
  }
});

shipmentRouter.get("/", async (req, res) => {
  try {
    const { userId } = req.body;

    const shipments = await shipmentController.getAllShipments(userId);
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shipments" });
  }
});

export default shipmentRouter;
