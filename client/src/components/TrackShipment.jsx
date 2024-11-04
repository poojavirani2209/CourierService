import React, { useState } from 'react';
import RequestProvider from '../api/apiRequestProvider';

function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState(null);

  const handleTrackShipment = async () => {
    try {
      const shipmentDetails = await RequestProvider.request().get(`/shipments/${trackingNumber}`);
      setShipment(shipmentDetails);
    } catch (error) {
      setShipment(null);
      setError(`Shipment was not found!`)
    }
  };

  return (
    <div>
      <h2>Track Shipment</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input type="text" placeholder="Tracking Number" onChange={(e) => setTrackingNumber(e.target.value)} />
      <button onClick={handleTrackShipment}>Track</button>
      {shipment && (
        <div>
          <h3>Shipment Details:</h3>
          <p>Recipient: {shipment.recipientName}</p>
          <p>Status: {shipment.status}</p>
        </div>
      )}
    </div>
  );
};

export default TrackShipment;
