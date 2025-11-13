# Food Delivery App

A modern full-stack food delivery application built with React, Node.js, Express, and MongoDB.

## Features

- 🍕 Browse restaurants and menus
- 🛒 Add items to cart
- 📦 Place and track orders
- 👤 User authentication
- 💳 Order management
- 📱 Responsive design with modern UI

## Tech Stack

**Frontend:**
- React 18
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- Lucide React for icons

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT authentication
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. Clone the repository
2. Install all dependencies:
```bash
npm run install-all
```

### Running the Application

Run both client and server concurrently:
```bash
npm run dev
```

Or run them separately:
```bash
# Terminal 1 - Server (runs on port 5000)
npm run server

# Terminal 2 - Client (runs on port 3000)
npm run client
```

### Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
food-delivery-app/
├── client/          # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
├── server/          # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── package.json     # Root package with concurrently
```

## API Endpoints

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID

### Menu Items
- `GET /api/menu/:restaurantId` - Get menu items for a restaurant

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:userId` - Get user orders

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

## Environment Variables

Create a `.env` file in the server directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

## License

ISC
