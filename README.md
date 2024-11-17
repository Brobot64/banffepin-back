# Banff-Pay E-Pin Management System

## Overview
The Banff-Pay E-Pin Management System is a web application designed to facilitate the generation, management, and distribution of electronic pins (E-Pins) for various telco providers. The application provides functionalities for user account management, wallet management, scheduling tasks, and handling transactions related to E-Pins.


## Table of Contents

1. [Features](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#installation)
4. [Project Structure](#usage)
5. [API Endpoints](#features)
6. [Database Models](#folder-structure)
7. [Environment Variables](#api-integration)
8. [Deployment](#api-integration)

## Features
- User registration and authentication
- Wallet creation and balance management
- E-Pin generation and management
- Scheduling of tasks for automated E-Pin uploads
- SMS verification for user accounts
- Transaction PIN management for secure transactions


## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) and API Keys
- **Task Scheduling**: Node-Cron
- **PDF Generation**: Fileforge Client
- **Environment Configuration**: dotenv



## Getting Started
### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Brobot64/banffepin-back.git
   cd banffepin-back

    ```

2. **Install dependencies**:
    ``` bash
    npm install
    ```

3. Create a `.env` file in the root directory and populate it with the required environment variables.

4. **Start the development server**:
    ```bash
    npm start
    ```

5. The server will run on `http://localhost:3003`



## Project Structure

```
banff-pay/
│
├── src/
│   ├── controllers/               # Controllers for handling requests
│   ├── models/                     # Mongoose models for MongoDB
│   ├── routes/                     # API routes
│   ├── services/                   # Business logic and services
│   ├── utils/                      # Utility functions
│   ├── middleware/                 # Middleware for authentication and validation
│   └── config/                     # Configuration files
│
├── .env                            # Environment variables
├── package.json                    # Project metadata and dependencies
└── README.md                       # Project documentation
```


## API Endpoints
### User Management
- **POST /auth/signup**: Register a new user
- **POST /auth/signin**: User login
- **GET /auth/userinfo/**:token: Get user information

### Wallet Management
- **POST /wallet**: Create a wallet
- **GET /wallet/**:userId: Get wallet by user ID
- **PUT /wallet/**:userId: Update wallet balance
- **POST /wallet/**:userId/deduct: Deduct amount from wallet

### E-Pin Management
- **GET /epin**: Get all E-Pins
- **GET /epin/:serial**: Get E-Pin by serial number
- **POST /epin/**: Assign E-Pins to an agent



### Scheduling
- **POST /scheduler**: Create a new schedule
- **GET /scheduler**: Get all schedules
- **PUT /scheduler/:id**: Update a schedule
- **DELETE /scheduler/:id**: Remove a schedule


### Token Management
- **POST /token**: Send verification token to phone number
- **POST /token/verify/:phone/:token**: Verify the sent token
- **GET /token/:phone**: Resend verification token


## Database Models
### User Model
- `phone`: String (required)
- `name`: String (required)
- `gender`: String (required)
- `dob`: Date (required)
- `email`: String
- `password`: String (hashed)
- `usertype`: Enum (Admin, Personal, Agent, Viewer)
- `status`: Enum (Active, Suspended, Banned)
- `transact_pin`: String (optional)

### Wallet Model
- `userId`: ObjectId (required, reference to User)
- `balance`: Number (default: 0)

### E-Pin Model
- `denomination`: String - serial: String (unique, required)
- `status`: Enum (Active, Used, Expired)
- `assignedTo`: ObjectId (optional, reference to User)


## Environment Variables
To run the application, you need to set up the following environment variables in your `.env` file:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
