import { getDbClient } from "../database/database";
import {
  addShipment,
  findAllShipments,
  findShipmentByTrackingNumber,
  findShipmentByUserId,
} from "../models/shipment";
import {
  NewShipment,
  ShipmentDetails,
  ShipmentStatus,
} from "../types/shipment";

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

export async function getAllShipments(userId?: string) {
  try {
    let shipments: Array<ShipmentDetails> | null;
    if (userId) {
      shipments = await findShipmentByUserId(userId);
    } else {
      shipments = await findAllShipments();
    }

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

export async function updateShipmentStatus(
  shipmentId: string,
  status: ShipmentStatus
) {
  try {
    const result = await getDbClient().query(
      `UPDATE shipments
    SET status = $1
    WHERE id = $2`,
      [status, shipmentId]
    );
    if (result.rowCount === 0) {
      throw new Error("Shipment not found");
    }
    console.log(`Shipment status updated successfully for ID: ${shipmentId}`);
  } catch (error) {
    console.error(`Error updating shipment status: ${error.message}`);
    throw error;
  }
}

export async function getShipmentById(shipmentId: string) {
  try {
    const result = await getDbClient().query(
      `SELECT * FROM shipment
    WHERE id = $1`,
      [shipmentId]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error(`Error fetching shipment: ${error.message}`);
    throw error;
  }
}
