# Classifieds Web Application

A full-stack classifieds platform for buying and selling used products, built with React.js, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Listing Management**: Create, view, update, and delete product listings
- **Image Upload**: Support for multiple images per listing (up to 5)
- **Advanced Search & Filters**: Search by keywords, category, price range, and condition
- **User Profiles**: Manage personal information and view listing history
- **Responsive Design**: Modern UI built with TailwindCSS
- **Real-time Updates**: View counts and status tracking

## Tech Stack

### Frontend
- React.js 18
- React Router DOM for navigation
- Axios for API calls
- TailwindCSS for styling
- Context API for state management

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Multer for file uploads
- bcrypt.js for password hashing

## Project Structure

```
classifieds-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context
│   │   ├── pages/         # Page components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                # Node.js backend
│   ├── middleware/        # Auth middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── uploads/          # Uploaded images
│   ├── index.js
│   └── package.json
├── .env                  # Environment variables
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### 1. Clone the repository
```bash
cd classifieds-app
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 4. Environment Variables
The `.env` file in the root directory should contain:
```
MONGO_URI=mongodb+srv://skpvikaash:vikash100@cluster0.k3mnor2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=some_secret_string
PORT=5000
```

### 5. Run the Application

#### Start Backend Server (from server directory)
```bash
cd server
npm run dev
```
The server will run on `http://localhost:5000`

#### Start Frontend (from client directory, in a new terminal)
```bash
cd client
npm start
```
The client will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Listings
- `GET /api/listings` - Get all listings (with filters)
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (protected)
- `PUT /api/listings/:id` - Update listing (protected)
- `DELETE /api/listings/:id` - Delete listing (protected)
- `GET /api/listings/user/my-listings` - Get user's listings (protected)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile (protected)

## Features Breakdown

### User Features
- Register and login with email/password
- Update profile information
- View personal listing dashboard
- Track listing views and status

### Listing Features
- Create listings with title, description, price, category, condition, location
- Upload up to 5 images per listing
- Mark listings as sold
- Delete listings
- View detailed listing information
- Contact sellers via phone or email

### Search & Filter
- Search by keywords in title/description
- Filter by category (Electronics, Furniture, Vehicles, etc.)
- Filter by price range
- Filter by condition (New, Like New, Good, Fair, Poor)
- View active/sold/inactive listings

## Security Features
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes and API endpoints
- Input validation
- Secure file upload handling

## Future Enhancements
- User ratings and reviews
- Messaging system between buyers and sellers
- Favorite/saved listings
- Advanced location-based search
- Payment integration
- Email notifications
- Social media sharing

## License
ISC

## Author
Classifieds Team
