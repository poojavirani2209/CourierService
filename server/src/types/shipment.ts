export interface NewShipment {
  userId: string;
  recipientName: string;
  recipientAddress: string;
  shipmentDetails: string;
}

export interface ShipmentDetails extends NewShipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  createdAt: string;
}

export enum ShipmentStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}
