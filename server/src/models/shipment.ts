import { getDbClient } from "../database/database";
import {
  NewShipment,
  ShipmentDetails,
  ShipmentStatus,
} from "../types/shipment";

export async function createShipmentTable(): Promise<void> {
  try {
    const result = await getDbClient().query(
      `
             CREATE TABLE shipments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    recipient_name VARCHAR(255) NOT NULL,
    recipient_address TEXT NOT NULL,
    shipment_details TEXT,
    tracking_number VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  
            `
    );
    console.log(`Shipments table created.`);
  } catch (error) {
    if (error.code == `42P07`) {
      console.error(`Table already exists`);
    } else {
      console.error(`Error creating shipments table: ${error}`);
      throw error;
    }
  }
}

export async function addShipment(shipment: NewShipment): Promise<string> {
  const {
    userId,
    recipientName,
    recipientAddress,
    shipmentDetails,
  } = shipment;

  const trackingNumber = `TRACK-${Date.now()}`;

  try {
    const result = await getDbClient().query(
      "INSERT INTO shipments (user_id, recipient_name, recipient_address, shipment_details, tracking_number, status) VALUES ($1, $2, $3, $4, $5,$6)",
      [
        userId,
        recipientName,
        recipientAddress,
        shipmentDetails,
        trackingNumber,
        ShipmentStatus.PENDING,
      ]
    );
    return trackingNumber;
  } catch (error) {
    console.error(`Error inserting shipment: ${error}`);
    throw error;
  }
}

export async function findShipmentByTrackingNumber(
  trackingNumber: string
): Promise<ShipmentDetails | null> {
  try {
    const result = await getDbClient().query(
      "SELECT * FROM shipments WHERE tracking_number = $1",
      [trackingNumber]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error(
      `Error finding shipment by tracking number in table: ${error}`
    );
    throw error;
  }
}

export async function findShipmentByUserId(
  userId: string
): Promise<Array<ShipmentDetails> | null> {
  try {
    const result = await getDbClient().query(
      "SELECT * FROM shipments WHERE user_id = $1",
      [userId]
    );
    return result.rows.length > 0 ? result.rows : null;
  } catch (error) {
    console.error(`Error finding shipment by userId in table: ${error}`);
    throw error;
  }
}
