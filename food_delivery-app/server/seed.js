const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

dotenv.config();

const restaurants = [
  {
    name: "Pizza Palace",
    description: "Authentic Italian pizzas with fresh ingredients",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    cuisine: ["Italian", "Pizza"],
    rating: 4.5,
    deliveryTime: "30-40 min",
    minOrder: 10
  },
  {
    name: "Burger House",
    description: "Juicy burgers and crispy fries",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    cuisine: ["American", "Fast Food"],
    rating: 4.3,
    deliveryTime: "20-30 min",
    minOrder: 8
  },
  {
    name: "Sushi Master",
    description: "Fresh sushi and Japanese delicacies",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.7,
    deliveryTime: "40-50 min",
    minOrder: 15
  },
  {
    name: "Pasta Paradise",
    description: "Homemade pasta and Italian classics",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500",
    cuisine: ["Italian", "Pasta"],
    rating: 4.4,
    deliveryTime: "35-45 min",
    minOrder: 12
  },
  {
    name: "Taco Fiesta",
    description: "Authentic Mexican tacos and burritos",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500",
    cuisine: ["Mexican"],
    rating: 4.2,
    deliveryTime: "25-35 min",
    minOrder: 10
  }
];

const menuItems = [
  // Pizza Palace
  { name: "Margherita Pizza", description: "Classic pizza with tomato, mozzarella, and basil", price: 12.99, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400", category: "Pizza", isVegetarian: true, rating: 4.5 },
  { name: "Pepperoni Pizza", description: "Loaded with pepperoni and cheese", price: 14.99, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400", category: "Pizza", isVegetarian: false, rating: 4.6 },
  { name: "Veggie Supreme", description: "Loaded with fresh vegetables", price: 13.99, image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400", category: "Pizza", isVegetarian: true, rating: 4.3 },
  
  // Burger House
  { name: "Classic Burger", description: "Beef patty with lettuce, tomato, and cheese", price: 9.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", category: "Burger", isVegetarian: false, rating: 4.4 },
  { name: "Chicken Burger", description: "Crispy chicken with special sauce", price: 10.99, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400", category: "Burger", isVegetarian: false, rating: 4.3 },
  { name: "Veggie Burger", description: "Plant-based patty with fresh veggies", price: 9.49, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400", category: "Burger", isVegetarian: true, rating: 4.1 },
  
  // Sushi Master
  { name: "California Roll", description: "Crab, avocado, and cucumber", price: 11.99, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400", category: "Main Course", isVegetarian: false, rating: 4.7 },
  { name: "Salmon Nigiri", description: "Fresh salmon over rice", price: 13.99, image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400", category: "Main Course", isVegetarian: false, rating: 4.8 },
  { name: "Vegetable Tempura", description: "Crispy fried vegetables", price: 8.99, image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=400", category: "Appetizer", isVegetarian: true, rating: 4.4 },
  
  // Pasta Paradise
  { name: "Spaghetti Carbonara", description: "Creamy pasta with bacon and egg", price: 14.99, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400", category: "Pasta", isVegetarian: false, rating: 4.5 },
  { name: "Penne Arrabbiata", description: "Spicy tomato sauce with penne", price: 12.99, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400", category: "Pasta", isVegetarian: true, rating: 4.3 },
  { name: "Fettuccine Alfredo", description: "Rich and creamy alfredo sauce", price: 13.99, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400", category: "Pasta", isVegetarian: true, rating: 4.4 },
  
  // Taco Fiesta
  { name: "Beef Tacos", description: "Three tacos with seasoned beef", price: 10.99, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400", category: "Main Course", isVegetarian: false, rating: 4.3 },
  { name: "Chicken Burrito", description: "Large burrito with chicken and beans", price: 11.99, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400", category: "Main Course", isVegetarian: false, rating: 4.4 },
  { name: "Veggie Quesadilla", description: "Cheese and vegetable quesadilla", price: 9.99, image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400", category: "Main Course", isVegetarian: true, rating: 4.2 }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert restaurants
    const insertedRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`✅ Inserted ${insertedRestaurants.length} restaurants`);

    // Insert menu items with restaurant references
    const menuItemsWithRefs = [];
    let itemIndex = 0;
    
    for (let i = 0; i < insertedRestaurants.length; i++) {
      const itemsPerRestaurant = 3;
      for (let j = 0; j < itemsPerRestaurant; j++) {
        if (itemIndex < menuItems.length) {
          menuItemsWithRefs.push({
            ...menuItems[itemIndex],
            restaurant: insertedRestaurants[i]._id
          });
          itemIndex++;
        }
      }
    }

    const insertedMenuItems = await MenuItem.insertMany(menuItemsWithRefs);
    console.log(`✅ Inserted ${insertedMenuItems.length} menu items`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
