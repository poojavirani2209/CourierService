# Courier Service README

## Problem Overview

This repository contains a full-stack courier service application built with React for the frontend and Node.js with Express for the backend. The application supports functionalities such as user registration,login, shipment creation, tracking, user dashboard and an admin dashboard for managing shipments.

## High-Level Design (HLD)

The high-level architecture of the Courier Service consists of the following components:

- **Frontend:** Built with React.js using a component-based architecture, providing an interactive user interface for both users and admins.
- **Backend:** A RESTful API developed using Node.js and Express, handling requests and managing business logic.
- **Database:** PostgreSQL is used to store user and shipment information, providing a robust relational database solution.

## Low-Level Design (LLD)

This low-level design includes detailed descriptions of the modules and their interactions:

### Modules

1. **User Management**

   - **Functions:** Register new users, authenticate users, and manage user roles (admin).
   - **Endpoints:**
     - `POST /users/register` - Registers a new user.
     - `POST /users/login` - Authenticates a user.

2. **Shipment Management**

   - **Functions:** Create, track, and update shipments.
   - **Endpoints:**
     - `POST /shipments/create` - Creates a new shipment.
     - `GET /shipments/:trackingNumber` - Tracks a shipment by its tracking number.
     - `PUT /shipments/:id` - Updates the status of a shipment (admin only).
     - `GET /shipments` - Retrieves all shipments for admin review.
     - `GET /shipments\:userId` - Retrieves all shipments for userId review.

3. **Admin Management**

   - **Functions:** View all shipments and update their statuses.
   - ## **Endpoints:**
   - `POST /admin/register` - Registers a new admin user.
   - `POST /users/login` - Authenticates a user( for both admin and normal user endpoint is same)

## Database Schema

The following database schema outlines the tables used in the application:

### Users Table

| Column Name    | Data Type    | Description                      |
| -------------- | ------------ | -------------------------------- |
| id             | SERIAL       | Primary Key                      |
| email          | TEXT         | Unique email address of the user |
| password       | TEXT         | Hashed password                  |
| sender_name    | TEXT         | User role (admin/user)           |
| sender_name    | VARCHAR(255) | Name of the sender               |
| sender_address | TEXT         | Address of the sender            |
| admin          | BOOLEAN      | if the user has admin privileges |

### Shipments Table

| Column Name       | Data Type | Description                             |
| ----------------- | --------- | --------------------------------------- |
| id                | SERIAL    | Primary Key                             |
| user_id           | INT       | Foreign Key referencing Users table     |
| recipient_name    | TEXT      | Name of the shipment recipient          |
| recipient_address | TEXT      | Address of the shipment recipient       |
| shipment_details  | TEXT      | Details about the shipment              |
| status            | TEXT      | Current status of the shipment          |
| tracking_number   | TEXT      | Unique tracking number for the shipment |

## Project Setup

## Prerequisites

Before setting up the application, ensure you have the following installed on your system:

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **PostgreSQL**: This application uses PostgreSQL as its database. If you don't have PostgreSQL installed, you can download it from the [official PostgreSQL website](https://www.postgresql.org/download/). Follow the installation instructions for your operating system.

### Setting Up PostgreSQL

1. **Download and Install**:

   - Choose your operating system from the PostgreSQL downloads page and follow the instructions to install PostgreSQL.

2. **Create a Database**:

   - Once installed, you can create a new database using the PostgreSQL command line or a GUI tool like pgAdmin.
   - For example, to create a database named `courierService`, you can use the following command in the PostgreSQL shell:
     ```sql
     CREATE DATABASE courierService;
     ```

3. **Configure Your Environment**:
   - Create a `.env` file in the root of your project directory. This file will contain the database connection string and database name.
   - Your `.env` file should look something like this:
     ```env
     DATABASE_URL=postgres://username:password@localhost:5432/courierService
     DATABASE_NAME=courierService
     ```
   - Replace `username` and `password` with your PostgreSQL credentials.

### Clone the project

```bash
git clone https://github.com/yourusername/courier-service
```

### Navigate to the project directory

```bash
  cd CourierService
```

### Install dependencies for frontend and backend separately

**Tip:** To efficiently install dependencies for both frontend and backend simultaneously, use split terminals.

Install frontend dependencies

```bash
cd client
npm install
```

Install backend dependencies

```bash
cd server
npm install
```

### Running Development Servers

**Important:**

- **Separate terminals**: Run the commands in separate terminal windows or use `split terminal` to avoid conflicts.

#### Start the backend server

- Navigate to the `server` directory: `cd server`
- Start the server: `npm run start`
- You should see a message indicating the server is running, usually on port 8887.

#### Start the frontend server:

- Navigate to the `client` directory: `cd client`
- Start the server: `npm start`
- You should see a message indicating the server is running, usually on port 3000.

=

### Accessing the Application

Once both servers are running, you can access them at the following URL's:

- Client: http://localhost:3000
- Server: http://localhost:8887

## Authors

- [@PoojaVirani](https://github.com/poojavirani2209)
