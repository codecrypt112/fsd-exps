const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://skpvikaash:vikash100@cluster0.k3mnor2.mongodb.net/survey-app?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/surveys', require('./routes/surveyRoutes'));

app.get('/', (req, res) => {
  res.send('Survey API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
