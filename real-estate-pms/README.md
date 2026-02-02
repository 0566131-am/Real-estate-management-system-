# Real Estate Property Management System (PMS)

The Real Estate Management Project is designed to streamline and automate the management of residential and commercial properties. The project focuses on efficiently handling property listings, tenant information, lease agreements, rent collection, maintenance requests, and financial reporting within a centralized system.

## Features

- Property listings management
- Tenant information tracking
- Lease agreement handling
- Rent collection
- Maintenance requests
- Financial reporting

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd real-estate-pms
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the server:
   ```
   node server.js
   ```

The server will start on `http://localhost:3000`.

## API Endpoints

- `GET /` - Test server
- `GET /test-db` - Test database connection
- `POST /api/properties` - Add a new property
- `GET /api/properties` - Get all properties
- `POST /api/tenants` - Add a new tenant
- `GET /api/tenants` - Get all tenants
- `GET /api/properties/:id/tenants` - Get tenants for a specific property

## Database

The application uses SQLite database (`pms.db`) with the following tables:
- `properties` - Stores property information
- `tenants` - Stores tenant information linked to properties

## Technologies Used

- Node.js
- Express.js
- SQLite3
- Body-parser
- CORS