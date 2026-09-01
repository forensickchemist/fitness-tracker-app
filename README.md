# Fitness Tracker

A full-stack fitness tracking application that allows users to create, manage, and track their workouts.

The application uses a Vue.js frontend, an Express.js REST API, and MongoDB for data storage. User authentication is handled using JWT, with protected workout endpoints available only to authenticated users.

## Tech Stack

### Frontend

* Vue.js
* Vite
* Pinia
* Vue Router
* Bootstrap
* Custom CSS
* Vercel

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Render

## Features

* User registration
* User login
* JWT authentication
* Protected routes
* View authenticated user details
* Add workouts
* View personal workouts
* Edit workouts
* Complete workouts
* Delete workouts
* Workout status tracking
* Responsive user interface
* Custom theme variables and global styling

## Application Structure

```text
Fitness Tracker
│
├── Frontend
│   ├── Vue.js
│   ├── Pinia
│   ├── Vue Router
│   └── Vercel
│
├── Backend
│   ├── Node.js
│   ├── Express.js
│   ├── Mongoose
│   └── Render
│
└── Database
    └── MongoDB
```

## Authentication Flow

1. A user registers through the frontend.
2. The frontend sends the registration request to the backend.
3. The user logs in using their email and password.
4. The backend verifies the credentials.
5. The backend returns a JWT access token.
6. The frontend stores the token in `localStorage`.
7. Authenticated API requests include the token in the `Authorization` header.
8. Protected backend routes verify the token before processing the request.

## API

### Backend Base URL

```text
https://fitnessapp-api-ln8u.onrender.com
```

### Main API Resources

```text
/users
/workouts
```

### User Endpoints

```text
POST   /users/register
POST   /users/login
GET    /users/details
```

### Workout Endpoints

```text
POST   /workouts/addWorkout
GET    /workouts/getMyWorkouts
PUT    /workouts/updateWorkout/:id
DELETE /workouts/deleteWorkout/:id
PATCH  /workouts/completeWorkoutStatus/:id
```

Protected endpoints require a valid JWT access token.

## Frontend Routes

```text
/workouts  Dashboard
/login     Login
/register  Register
```

The dashboard and protected application features require authentication.

## Deployment

The application is deployed as two separate services:

```text
Vue Frontend
     │
     │ HTTPS
     ▼
Express API
     │
     ▼
MongoDB
```

* Frontend: Vercel
* Backend: Render
* Database: MongoDB

## Environment Variables

### Frontend

```env
VITE_API_URL=https://fitnessapp-api-ln8u.onrender.com
```

### Backend

The backend requires environment variables for its database connection, JWT configuration, and server configuration.

Example:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

Never commit secret environment variables to source control.

## Local Development

Clone the frontend and backend repositories.

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

Make sure the frontend's `VITE_API_URL` points to the running backend.

## Project Status

The core authentication and workout management functionality is implemented and deployed.

## License

This project is for educational and portfolio purposes.
