import React, { useState } from 'react';
import RequestProvider from '../api/apiRequestProvider';

function CreateShipment() {
  const [userId, setUserId] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [shipmentDetails, setShipmentDetails] = useState('');
  const [message, setMessage] = useState('');


  const handleCreateShipment = async () => {
    try {
      setMessage('');
      if (!recipientAddress || !recipientName || !shipmentDetails) {
        setMessage('All fields are required');
        return;
      }
      let shipmentCreationResponse = await RequestProvider.request().post('/shipments/create', { userId, recipientName, recipientAddress, shipmentDetails });
      setMessage(shipmentCreationResponse);
    } catch (error) {
      setMessage('Failed to create shipment!');
    }
  };

  return (
    <div>
      <h2>Create Shipment</h2>
      {message && <div style={{ color: 'red' }}>{message}</div>}
      <input type="text" placeholder="UserId" onChange={(e) => setUserId(e.target.value)} />
      <input type="text" placeholder="Recipient Name" onChange={(e) => setRecipientName(e.target.value)} />
      <input type="text" placeholder="Recipient Address" onChange={(e) => setRecipientAddress(e.target.value)} />
      <input type="text" placeholder="Shipment Details" onChange={(e) => setShipmentDetails(e.target.value)} />
      <button onClick={handleCreateShipment}>Create Shipment</button>
    </div>
  );
};

export default CreateShipment;
