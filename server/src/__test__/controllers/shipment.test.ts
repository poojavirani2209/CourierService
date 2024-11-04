import { createShipment } from "../../controllers/shipmentController";
import { addShipment } from "../../models/shipment";
import { NewShipment, ShipmentStatus } from "../../types/shipment";

jest.mock("../../models/shipment");

describe("createShipment", () => {
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
    (addShipment as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await createShipment(shipmentDetails);

    expect(result).toBe("New Shipment added successfully");
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
