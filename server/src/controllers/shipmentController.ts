import {
  addShipment,
  findShipmentByTrackingNumber,
  findShipmentByUserId,
} from "../models/shipment";
import { NewShipment } from "../types/shipment";

export async function createShipment(shipment: NewShipment) {
  const { userId, recipientName, recipientAddress, shipmentDetails } = shipment;

  try {
    const trackingNumber = await addShipment({
      userId,
      recipientName,
      recipientAddress,
      shipmentDetails,
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

export async function getAllShipments(userId: string) {
  try {
    const shipments = await findShipmentByUserId(userId);
    if (shipments) {
      console.log(`Successfully attained shipments for userId ${userId}`);
      return shipments;
    } else {
      return `Invalid UserId`;
    }
  } catch (error) {
    console.error(`Error occurred while getting shipments for a user`);
    throw error;
  }
}
