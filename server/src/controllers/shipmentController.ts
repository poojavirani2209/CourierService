import { addShipment, findShipmentByTrackingNumber } from "../models/shipment";
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
    return trackingNumber;
  } catch (error) {
    console.error(
      `Error occurred while adding a new shipment in shipments table`
    );
    throw error;
  }
}

export async function trackShipment(trackingNumber: string) {
  try {
    const shipment = await findShipmentByTrackingNumber(trackingNumber);
    if (shipment) {
      console.log(
        `Successfully attained shipment for trackingNumber ${trackingNumber}`
      );
      return shipment;
    } else {
      return `Invalid Tracking Number`;
    }
  } catch (error) {
    console.error(`Error occurred while tracking a shipment`);
    throw error;
  }
}
