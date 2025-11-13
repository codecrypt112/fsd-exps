# Food Delivery App - Setup Guide

## 🎉 Application Successfully Created!

Your full-stack food delivery application is ready to use with React, Node.js, Express, and MongoDB.

## 📁 Project Structure

```
food-delivery-app/
├── client/              # React frontend (Port 3000)
│   ├── public/
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── context/     # Auth and Cart context
│       ├── pages/       # Page components
│       ├── services/    # API service layer
│       ├── App.js
│       └── index.js
├── server/              # Node.js backend (Port 5000)
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Main server file
│   └── seed.js          # Database seeding script
└── package.json         # Root package with concurrently
```

## 🚀 Quick Start

### 1. Install Dependencies (Already Done)
```bash
npm run install-all
```

### 2. Seed the Database (Already Done)
```bash
cd server
node seed.js
```

### 3. Run the Application
```bash
# From the root directory
npm run dev
```

This will start both:
- **Backend API**: http://localhost:5000
- **Frontend App**: http://localhost:3000

## 🔑 Features Implemented

### Frontend (React)
- ✅ Modern UI with TailwindCSS
- ✅ Responsive design for mobile and desktop
- ✅ Restaurant browsing with search
- ✅ Menu viewing with categories
- ✅ Shopping cart functionality
- ✅ User authentication (Login/Register)
- ✅ Order placement and tracking
- ✅ Protected routes
- ✅ Context API for state management

### Backend (Node.js/Express)
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ CORS enabled
- ✅ Input validation
- ✅ Error handling

### Database Models
- ✅ User (with authentication)
- ✅ Restaurant
- ✅ MenuItem
- ✅ Order

## 📊 Sample Data

The database has been seeded with:
- **5 Restaurants**: Pizza Palace, Burger House, Sushi Master, Pasta Paradise, Taco Fiesta
- **15 Menu Items**: Various dishes across different categories
- Ready for testing and development

## 🔐 Environment Variables

The MongoDB connection is already configured in `server/.env`:
```
MONGODB_URI=mongodb+srv://skpvikaash:vikash100@cluster0.k3mnor2.mongodb.net/fooddelivery?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

**⚠️ Important**: Change the JWT_SECRET before deploying to production!

## 🧪 Testing the Application

### Test Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Get all restaurants
curl http://localhost:5000/api/restaurants

# Get menu items for a restaurant (replace ID)
curl http://localhost:5000/api/menu/RESTAURANT_ID
```

### Test Frontend
1. Open http://localhost:3000 in your browser
2. Browse restaurants
3. Click on a restaurant to view menu
4. Add items to cart
5. Register/Login
6. Place an order

## 📝 Available Scripts

### Root Directory
- `npm run dev` - Run both client and server concurrently
- `npm run server` - Run only the backend server
- `npm run client` - Run only the frontend client
- `npm run install-all` - Install all dependencies

### Server Directory
- `npm start` - Start the server (production)
- `npm run dev` - Start the server with nodemon (development)
- `node seed.js` - Seed the database

### Client Directory
- `npm start` - Start the React development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🌐 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID

### Menu
- `GET /api/menu/:restaurantId` - Get menu items for a restaurant
- `GET /api/menu/item/:id` - Get single menu item

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/user` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PATCH /api/orders/:id/status` - Update order status (protected)

## 🎨 Tech Stack

**Frontend:**
- React 18
- React Router v6
- Axios
- TailwindCSS
- Lucide React (icons)
- Context API

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Express Validator

**Development:**
- Concurrently (run both servers)
- Nodemon (auto-restart server)
- React Scripts (CRA)

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 or 5000 is already in use:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Issues
- Verify your MongoDB Atlas credentials
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure the connection string is correct in `server/.env`

### Module Not Found
```bash
# Reinstall dependencies
npm run install-all
```

## 🚀 Deployment Tips

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder
3. Set environment variable: `REACT_APP_API_URL=your-backend-url`

### Backend (Heroku/Railway/Render)
1. Deploy the `server` folder
2. Set environment variables (MONGODB_URI, JWT_SECRET, PORT)
3. Update CORS settings to allow your frontend domain

## 📚 Next Steps

1. **Customize the UI**: Modify colors in `client/tailwind.config.js`
2. **Add More Features**: 
   - Payment integration (Stripe, PayPal)
   - Real-time order tracking
   - Restaurant admin panel
   - Reviews and ratings
   - Favorites/Wishlist
3. **Improve Security**: 
   - Add rate limiting
   - Implement refresh tokens
   - Add email verification
4. **Testing**: Add unit and integration tests
5. **Performance**: Implement caching, image optimization

## 📞 Support

For issues or questions:
- Check the README.md
- Review the code comments
- Test API endpoints with Postman
- Check browser console for frontend errors
- Check server logs for backend errors

---

**Happy Coding! 🎉**
