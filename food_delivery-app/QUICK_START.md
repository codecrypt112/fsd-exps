# 🚀 Quick Start Guide

## Run the Application

```bash
# From the root directory
npm run dev
```

This starts:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

## Access Points

- **Main App**: http://localhost:3000
- **API Health**: http://localhost:5000/api/health
- **API Docs**: http://localhost:5000

## Test User Flow

1. Open http://localhost:3000
2. Click "Sign Up" to create an account
3. Browse restaurants on the home page
4. Click a restaurant to view its menu
5. Add items to cart
6. Click cart icon to review order
7. Click "Proceed to Checkout"
8. Fill in delivery details
9. Place order
10. View order confirmation
11. Check "My Orders" to see order history

## Sample Data Available

- 5 Restaurants (Pizza Palace, Burger House, Sushi Master, Pasta Paradise, Taco Fiesta)
- 15 Menu Items across different categories
- Ready to test immediately!

## Stop the Application

Press `Ctrl + C` in the terminal where `npm run dev` is running.

## Reseed Database (if needed)

```bash
cd server
node seed.js
```

## Common Issues

**Port in use?**
```bash
# Kill processes
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**Need to reinstall?**
```bash
npm run install-all
```

---

**Everything is ready! Just run `npm run dev` and start exploring! 🎉**
