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
    console.log(trackingNumber);

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
    const shipments = await shipmentController.getAllShipments();
    if (shipments == "Invalid UserId") {
      res.status(402);
    } else {
      res.status(200).json(shipments);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching shipments" });
  }
});

shipmentRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const shipments = await shipmentController.getAllShipments(userId);
    if (shipments == "Invalid UserId") {
      res.status(402);
    } else {
      res.status(200).json(shipments);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching shipments" });
  }
});

shipmentRouter.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await shipmentController.updateShipmentStatus(id, status);
    res.status(200).send("Shipment status updated successfully");
  } catch (error) {
    res.status(500).send("Error updating shipment status");
  }
});

shipmentRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const shipmentDetails = await shipmentController.getShipmentById(id);
    res.status(200).json(shipmentDetails);
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while fetching a shipment.`,
      details: error,
    });
  }
});

export default shipmentRouter;
