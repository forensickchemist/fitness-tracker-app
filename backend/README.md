# Fitness Tracker API

A simple RESTful Fitness Tracker API built with **Node.js**, **Express.js**, and **MongoDB**.

The API allows users to register and log in, manage their workout records, and track workout completion status. Users can only access and modify their own workouts.

## Features

- User registration
- User login with JWT authentication
- Retrieve authenticated user details
- Add workouts
- Retrieve personal workouts
- Update workouts
- Delete workouts
- Mark workouts as completed
- User-specific workout access
- Password hashing with bcrypt
- MongoDB database integration
- Appropriate HTTP status codes
- Environment variable configuration
- Ready for deployment on Render

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS
- Postman for API testing

---

## Project Structure

```
fitness-tracker/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── userController.js
│   └── workoutController.js
│
├── middleware/
│   ├── asyncHandler.js
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   └── Workout.js
│
├── routes/
│   ├── user.js
│   └── workout.js
│
├── .env
├── .gitignore
├── fitnessApp.json
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## Installation
1. Clone repository
`git clone <GITHUB_REPOSITORY_URL>`

2. Navigate into the project
`cd fitness-tracker`

3. Install dependencies
`npm install`

4. Create a `.env` file in the project root:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000

5. Running the API
    - Development:
    `npm run dev`

    - Production:
    `npm start`

    - The API runs locally at: 
    `http://localhost:4000`

6. API Routes
    - Users
        ```
        POST /users/register
        POST /users/login
        GET  /users/details
        ```
    - Workouts
        ```
        POST   /workouts/addWorkout
        GET    /workouts/getMyWorkouts
        PUT    /workouts/updateWorkout/:id
        DELETE /workouts/deleteWorkout/:id
        PATCH  /workouts/completeWorkoutStatus/:id
        ```
    Protected routes require a JWT:
    `Authorization: Bearer <token>`

7. Security
Authentication is handled using JWT. Passwords are hashed with bcrypt, and workout queries are restricted to the authenticated user's ID.

8. Deployment
The API is configured for deployment as a Node.js web service on Render.