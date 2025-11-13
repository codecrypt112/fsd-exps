const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const sampleQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    category: "Geography"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    category: "Science"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    category: "Mathematics"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    category: "Literature"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    category: "Geography"
  },
  {
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: "1945",
    category: "History"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
    category: "Science"
  },
  {
    question: "Which programming language is known as the 'mother of all languages'?",
    options: ["Python", "Java", "C", "Assembly"],
    correctAnswer: "C",
    category: "Technology"
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: "Vatican City",
    category: "Geography"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
    category: "Art"
  },
  {
    question: "What is the square root of 144?",
    options: ["11", "12", "13", "14"],
    correctAnswer: "12",
    category: "Mathematics"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    category: "Science"
  },
  {
    question: "In which continent is the Sahara Desert located?",
    options: ["Asia", "Africa", "South America", "Australia"],
    correctAnswer: "Africa",
    category: "Geography"
  },
  {
    question: "What is the most spoken language in the world?",
    options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correctAnswer: "Mandarin Chinese",
    category: "Language"
  },
  {
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
    correctAnswer: "Hydrogen",
    category: "Science"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://skpvikaash:vikash100@cluster0.k3mnor2.mongodb.net/survey-app?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log(`Seeded ${sampleQuestions.length} questions successfully`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();
