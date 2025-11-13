# Online Survey Application

A full-stack survey application where users can answer randomly selected questions and get their scores.

## Features

- Random selection of 5 questions from the database
- Interactive survey interface
- Score calculation and detailed results
- Question review with correct/incorrect answers
- Responsive design

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Styling**: CSS

## Project Structure

```
survey-app/
├── backend/
│   ├── models/
│   │   ├── Question.js
│   │   └── Survey.js
│   ├── routes/
│   │   └── surveyRoutes.js
│   ├── server.js
│   └── seed.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── SurveyForm.js
│   │   │   ├── SurveyForm.css
│   │   │   ├── SurveyResult.js
│   │   │   └── SurveyResult.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── .env
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Environment Configuration

Update the `.env` file with your MongoDB connection string:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

### 3. Seed the Database

Populate the database with sample questions:

```bash
npm run seed
```

### 4. Run the Application

Start both frontend and backend concurrently:

```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### GET /api/surveys/questions/random
Returns 5 randomly selected questions.

### POST /api/surveys/submit
Submits survey answers and returns the score.

**Request Body:**
```json
{
  "questions": [...],
  "answers": [...]
}
```

### GET /api/surveys/result/:id
Retrieves survey results by ID.

## Sample Questions

The application comes with 15 pre-loaded questions covering:
- Geography
- Science
- Mathematics
- Literature
- History
- Technology
- Art
- Language

## Usage

1. **Start Survey**: Click the "Start Survey" button
2. **Answer Questions**: Select answers for each question
3. **Submit**: Click "Submit Survey" to see results
4. **Review**: Check your answers and correct solutions
5. **Retake**: Click "Take Another Survey" for a new set of questions

## Development

### Backend Scripts

- `npm run server` - Start backend server only
- `npm run seed` - Populate database with sample questions

### Frontend Scripts

- `npm run client` - Start frontend only
- `npm run dev` - Start both frontend and backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
