import {
  createShipment,
  trackShipment,
} from "../../controllers/shipmentController";
import {
  addShipment,
  findShipmentByTrackingNumber,
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
    jest
      .spyOn(Date, "now")
      .mockImplementation(() => new Date("2024-01-01T00:00:00Z").getTime());
    (addShipment as jest.Mock).mockResolvedValueOnce(undefined);

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
        status: ShipmentStatus.PENDING,
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
        status: ShipmentStatus.PENDING,
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
