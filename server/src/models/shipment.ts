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
    id VARCHAR(255) PRIMARY KEY,
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

export async function addShipment(shipment: ShipmentDetails): Promise<void> {
  const {
    id,
    userId,
    recipientName,
    recipientAddress,
    shipmentDetails,
    status,
    trackingNumber,
    createdAt,
  } = shipment;

  try {
    const result = await getDbClient().query(
      "INSERT INTO shipments (id, user_id, recipient_name, recipient_address, shipment_details, tracking_number, status, created_at) VALUES ($1, $2, $3, $4, $5,$6)",
      [
        id,
        userId,
        recipientName,
        recipientAddress,
        shipmentDetails,
        trackingNumber,
        status,
        createdAt,
      ]
    );
    return;
  } catch (error) {
    console.error(`Error inserting shipment: ${error}`);
    throw error;
  }
}
