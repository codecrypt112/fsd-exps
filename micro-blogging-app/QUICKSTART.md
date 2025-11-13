# 🚀 Quick Start Guide

## Get Started in 2 Steps!

### 1️⃣ Install Dependencies (First Time Only)
```bash
npm run install-all
```

### 2️⃣ Start the Application
```bash
npm run dev
```

That's it! 🎉

## What Happens Next?

- ✅ Backend server starts on `http://localhost:5000`
- ✅ Frontend React app starts on `http://localhost:3000`
- ✅ Your browser will automatically open to `http://localhost:3000`

## First Time User?

1. Click **"Sign Up"** on the login page
2. Create your account with:
   - Username (at least 3 characters)
   - Email address
   - Password (at least 6 characters)
3. Start posting! 📝

## Features to Try

- ✍️ **Create a post** - Share your thoughts (up to 280 characters)
- ❤️ **Like posts** - Click the heart icon
- 👤 **View profiles** - Click on usernames or use the Profile button
- 🗑️ **Delete posts** - Click the trash icon on your own posts

## Troubleshooting

### Port Already in Use?
If you see an error about ports 3000 or 5000 being in use:
```bash
# Kill processes on those ports
kill -9 $(lsof -ti:3000)
kill -9 $(lsof -ti:5000)
```

### MongoDB Connection Issues?
The MongoDB connection is pre-configured. If you see connection errors:
- Check your internet connection
- The connection string is in `server/.env`

### Need to Restart?
```bash
# Stop the servers (Ctrl+C in terminal)
# Then run again:
npm run dev
```

## Project Structure

```
📁 micro-blogging-app/
├── 📁 client/          # React frontend (port 3000)
├── 📁 server/          # Node.js backend (port 5000)
├── 📄 package.json     # Root config with concurrently
└── 📄 README.md        # Full documentation
```

## Need Help?

Check the full `README.md` for:
- Complete API documentation
- Detailed feature list
- Architecture overview
- Security information

---

**Enjoy your micro-blogging experience! 🎉**
