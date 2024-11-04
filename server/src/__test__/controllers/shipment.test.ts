import {
  createShipment,
  getAllShipments,
  trackShipment,
} from "../../controllers/shipmentController";
import {
  addShipment,
  findShipmentByTrackingNumber,
  findShipmentByUserId,
} from "../../models/shipment";
import { NewShipment, ShipmentStatus } from "../../types/shipment";

jest.mock("../../models/shipment");

describe("Create new shipment", () => {
  const shipmentDetails = {
    userId: "user123",
    recipientName: "User2",
    recipientAddress: "123 street, USA",
    shipmentDetails: "Keep it safe",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`Given new shipment details, when creating shipment, then it should create it successfully`, async () => {
    (addShipment as jest.Mock).mockResolvedValueOnce(
      `TRACK-${new Date("2024-01-01T00:00:00Z").getTime()}`
    );

    const trackingNumber = await createShipment(shipmentDetails);

    expect(trackingNumber).toBe(
      `TRACK-${new Date("2024-01-01T00:00:00Z").getTime()}`
    );
    expect(addShipment).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: shipmentDetails.userId,
        recipientName: shipmentDetails.recipientName,
        recipientAddress: shipmentDetails.recipientAddress,
        shipmentDetails: shipmentDetails.shipmentDetails,
      })
    );
  });

  test(`Given error occurs in adding shipment to data, when creating shipment, then it should throw an error`, async () => {
    (addShipment as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to add shipment")
    );

    await expect(createShipment(shipmentDetails)).rejects.toThrow(
      "Failed to add shipment"
    );
    expect(addShipment).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: shipmentDetails.userId,
        recipientName: shipmentDetails.recipientName,
        recipientAddress: shipmentDetails.recipientAddress,
        shipmentDetails: shipmentDetails.shipmentDetails,
      })
    );
  });
});

describe("Track a shipment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Given a valid tracking number, when tracking a shipment, then it should successfully track the shipment", async () => {
    const trackingNumber = "TRACK-1234567890";
    const mockShipment = {
      id: "shipment123",
      userId: "user123",
      recipientName: "User2",
      recipientAddress: "123 street, USA",
      shipmentDetails: "Keep it safe",
      status: ShipmentStatus.IN_PROGRESS,
      createdAt: "2024-01-01",
      trackingNumber,
    };

    (findShipmentByTrackingNumber as jest.Mock).mockResolvedValueOnce(
      mockShipment
    );

    const shipmentDetails = await trackShipment(trackingNumber);

    expect(shipmentDetails).toEqual(mockShipment);
    expect(findShipmentByTrackingNumber).toHaveBeenCalledWith(trackingNumber);
  });

  test("Given an invalid tracking number, when tracking a shipment, then it should return error message", async () => {
    const trackingNumber = "INVALID-TRACKING-NUMBER";

    (findShipmentByTrackingNumber as jest.Mock).mockResolvedValueOnce(null);

    const shipmentDetails = await trackShipment(trackingNumber);

    expect(shipmentDetails).toBe("Invalid Tracking Number");
    expect(findShipmentByTrackingNumber).toHaveBeenCalledWith(trackingNumber);
  });

  test(`Given error occurs in getting shipment from data, when tracking a shipment, then it should throw an error`, async () => {
    const trackingNumber = "TRACK-1234567890";

    (findShipmentByTrackingNumber as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    await expect(trackShipment(trackingNumber)).rejects.toThrow(
      "Database error"
    );
    expect(findShipmentByTrackingNumber).toHaveBeenCalledWith(trackingNumber);
  });
});

describe("Get all shipments for a user", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Given valid user, when fetching all the shipments, then it should return shipments list", async () => {
    const mockShipments = [
      { id: "1", recipientName: "User1", status: "COMPLETED" },
      { id: "2", recipientName: "User2", status: "IN_PROGRESS" },
    ];

    (findShipmentByUserId as jest.Mock).mockResolvedValue(mockShipments);

    const result = await getAllShipments("1");

    expect(result).toEqual(mockShipments);
    expect(findShipmentByUserId).toHaveBeenCalledWith("1");
  });

  test("Given invalid user, when fetching all the shipments, then it should return error", async () => {
    (findShipmentByUserId as jest.Mock).mockResolvedValue(null);

    const result = await getAllShipments("invalidUserId");

    expect(result).toBe("Invalid UserId");
    expect(findShipmentByUserId).toHaveBeenCalledWith("invalidUserId");
  });

  test("Given database error occurrs, when fetching all the shipments, then it should throw error", async () => {
    const mockError = new Error("Database error");
    (findShipmentByUserId as jest.Mock).mockRejectedValue(mockError);

    await expect(getAllShipments("1")).rejects.toThrow("Database error");
  });
});
