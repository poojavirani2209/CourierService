## User Stories and Use Cases

### Feature: User can cancel a shipment
**User Story:** If a user who has created a shipment, wants to cancel it, should be able to stop the delivery process.

#### Positive Use Case:
From the dashboard, user clicks on the cancel button besides a shipment. A confirmation box appears, and when clicked on Confirm button, the cancellation process is started. Once done, the user sees a success messages and the shipment status updates to CANCELLED.

#### Negative Use Cases:
1. User tries to cancel a shipment which is already completed, which will result in a an error message. 
2. If the user tries to cancel the shipment without login, i.e. in stale session.

---

### Feature: Insurance for a shipment
**User Story:** If a user who has created a shipment, wants to insure it, during long shipment or fragile items.

#### Positive Use Case:
When creating a shipment, user sees an options to add insaurance. User selects the desired option from dropdown which gets added to the shipment. On submission, the insaurance is confirmed with the creation. 

#### Negative Use Cases:
1. User adds an insaurance without adding a shipment. 
2. User tries to create shipment in a stale session i.e. without being logged in. 

--- 

### Feature: Shipment notification
**User Story:** User might want to receive notification of the status of their shipment through phone or email.

#### Positive Use Case:
While creating a shipment, users gets a checkbox and input box to specify if they need notifications. On submission, regular updates will be sent to user, and on COMPLETE status, this regular updates will be closed. 

#### Negative Use Cases:
1. Invalid email or phone is provided by user. Verification of the input must be done before submission. 
2. User tries to create shipment and get notification in a stale session i.e. without being logged in. 

---

### Feature: Allow multiple recipients in shipments
**User Story:** If the user is a shopkeeper, they might want to send products to multiple consumers. There should be option to add multiple recipients with different addresses and the products for one shipment.

#### Positive Use Case:
1. Option for adding multiple recipients with name, address and product name is available for the user while creating shipment. After adding details the user clicks on submit. 

#### Negative Use Cases:
1. User adds empty recipient and clicks on submit. Validations must be provided. 
2. User tries to create shipment and add multiple recipients in a stale session i.e. without being logged in.

--- 

### Feature: Schedule multiple shipments
**User Story:** As a shopkeeper, I might want to schedule my shipments to a location, based on where to send it. 

#### Positive Use Case:
When creating a new shipment, schedule icon is present, which when user clicks they can select the date and time the shipment should be started. 

#### Negative Use Cases:
1. User provides an old date time. Validations must be done to show present and future date time only. 
2. User tries to create shipment and schedule in a stale session i.e. without being logged in.

