import { addShipment } from "../models/shipment";
import { NewShipment, ShipmentStatus } from "../types/shipment";
import { v4 as uuidv4 } from "uuid";

export async function createShipment(shipment: NewShipment) {
  const { userId, recipientName, recipientAddress, shipmentDetails } = shipment;

  const trackingNumber = `TRACK-${Date.now()}`;

  try {
    await addShipment({
      id: uuidv4(),
      userId,
      recipientName,
      recipientAddress,
      shipmentDetails,
      status: ShipmentStatus.PENDING,
      createdAt: Date.now().toString(),
      trackingNumber,
    });
    console.log(
      `Inserted shipment successfully with tracking number ${trackingNumber}`
    );
    return `New Shipment added successfully`;
  } catch (error) {
    console.error(
      `Error occurred while adding a new shipment in shipments table`
    );
    throw error;
  }
}
