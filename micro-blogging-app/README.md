# 🚀 MicroBlog - Modern Micro-Blogging Platform

A beautiful, full-stack micro-blogging application built with React, Node.js, Express, and MongoDB.

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT
- 📝 **Create Posts** - Share your thoughts (up to 280 characters)
- ❤️ **Like Posts** - Show appreciation for posts you enjoy
- 💬 **Comments** - Engage in conversations (reply functionality)
- 👤 **User Profiles** - View user profiles with their posts and stats
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive** - Works perfectly on all devices

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Axios
- Lucide React (icons)
- CSS3 with modern gradients

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 📦 Installation

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Configure Environment:**
   - The MongoDB connection string is already configured in `server/.env`
   - You can modify the JWT secret in `server/.env` for production

## 🚀 Running the Application

**Start both client and server concurrently:**
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

**Or run them separately:**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

## 📁 Project Structure

```
micro-blogging-app/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── api/           # API configuration
│       ├── components/    # Reusable components
│       ├── context/       # React Context (Auth)
│       ├── pages/         # Page components
│       ├── App.js
│       └── index.js
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── .env             # Environment variables
│   └── server.js        # Server entry point
└── package.json         # Root package.json with concurrently
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `POST /api/posts/:id/like` - Like/unlike post
- `DELETE /api/posts/:id` - Delete post

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/me` - Update profile
- `POST /api/users/:id/follow` - Follow/unfollow user

## 🎨 Features Showcase

### Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes

### Posts
- Create posts up to 280 characters
- Real-time character counter
- Like/unlike functionality
- Delete your own posts
- View post timestamps

### User Profiles
- View user information
- See all posts by user
- Follower/following counts
- Post statistics

## 🔒 Security

- Passwords are hashed using bcryptjs
- JWT tokens for secure authentication
- Protected API routes with middleware
- CORS enabled for frontend-backend communication

## 🌟 Getting Started

1. Run `npm run install-all` to install all dependencies
2. Run `npm run dev` to start the application
3. Open `http://localhost:3000` in your browser
4. Register a new account
5. Start posting and exploring!

## 📝 Notes

- The MongoDB connection string is already configured
- Make sure you have Node.js (v14+) installed
- The app uses port 3000 (frontend) and 5000 (backend)

## 🤝 Contributing

Feel free to fork this project and make it your own!

## 📄 License

ISC

---

Built with ❤️ using React, Node.js, and MongoDB
