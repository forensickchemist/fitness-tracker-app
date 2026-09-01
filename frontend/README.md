# Fitness Tracker Frontend

The frontend application for Fitness Tracker, built with Vue.js and Vite.

The application provides user authentication and a dashboard for managing personal workouts through the Fitness Tracker REST API.

## Tech Stack

* Vue.js
* Vite
* Pinia
* Vue Router
* Bootstrap
* Bootstrap Icons
* Custom CSS
* Vercel

## Features

* User registration
* User login
* JWT-based authentication
* Protected dashboard
* Add workouts
* View workouts
* Edit workouts
* Complete workouts
* Delete workouts
* Workout loading and error states
* Responsive layout
* Reusable UI components
* Centralized CSS variables
* Global application styling

## Project Structure

```text
src/
│
├── components/
│   ├── ui/
│   │   ├── BaseButton.vue
│   │   ├── BaseForm.vue
│   │   └── BaseInput.vue
│   │
│   └── workout/
│       ├── WorkoutForm.vue
│       ├── WorkoutCard.vue
│       └── WorkoutList.vue
│
├── services/
│   └── api.js
│
├── stores/
│   ├── auth.js
│   └── workout.js
│
├── views/
│   ├── DashboardView.vue
│   ├── LoginView.vue
│   └── RegisterView.vue
│
├── router/
│   └── index.js
│
├── assets/
│
└── App.vue
```

## Application Routes

| Route       | View          | Description            |
| ----------- | ------------- | ---------------------- |
| `/workouts` | DashboardView | Main workout dashboard |
| `/login`    | LoginView     | User login             |
| `/register` | RegisterView  | User registration      |

## Components

### BaseButton

Reusable button component supporting different variants and states.

### BaseForm

Reusable form container used by authentication and workout forms.

It provides:

* Form title
* Description
* Error messages
* Success messages
* Loading state
* Submit button
* Footer slot

### BaseInput

Reusable input component used throughout the application.

### WorkoutForm

Handles creating and editing workouts.

### WorkoutCard

Displays an individual workout and provides actions for:

* Edit
* Complete
* Delete

### WorkoutList

Retrieves and displays the authenticated user's workouts.

It also handles:

* Loading states
* Empty states
* Refreshing workouts
* Completing workouts
* Deleting workouts
* Error messages

## State Management

Pinia is used for application state management.

### Auth Store

The authentication store manages:

```text
accessToken
user
isAuthenticated
```

It provides actions for:

```text
register()
login()
getUserDetails()
logout()
```

### Workout Store

The workout store manages the user's workouts and provides actions for:

```text
addWorkout()
getMyWorkouts()
updateWorkout()
deleteWorkout()
completeWorkoutStatus()
```

## API Communication

API requests are centralized through:

```text
src/services/api.js
```

The API URL is configured using the Vite environment variable:

```env
VITE_API_URL=https://fitness-tracker-app-rjfr.onrender.com
```

Requests automatically include the stored JWT token when available.

Authenticated requests use:

```text
Authorization: Bearer <accessToken>
```

## Styling

The application uses Bootstrap primarily for grid/layout support while custom CSS provides the application's visual design.

Global design variables are maintained in:

```text
src/assets/variables.css
```

Global application styles are maintained in:

```text
src/assets/global.css
```

The design system includes variables for:

* Colors
* Typography
* Spacing
* Border radius
* Borders
* Shadows
* Focus states
* Layout dimensions
* Transitions
* Z-index values

### Themes

The CSS system currently supports:

```text
neon
endurance
zen
```

The default theme is the Neon palette.

## Authentication Flow

After registration, the user is redirected to the login page.

After successful login:

1. The API returns a JWT access token.
2. The token is stored in `localStorage`.
3. The frontend requests `/users/details`.
4. The authenticated user is stored in Pinia.
5. The user is redirected to the dashboard.

The router also prevents authenticated users from accessing the login and registration pages.

Unauthenticated users attempting to access protected routes are redirected to `/login`.

## Environment Variables

Create a local `.env` file:

```env
VITE_API_URL=http://localhost:4000
```

For production:

```env
VITE_API_URL=https://fitness-tracker-app-rjfr.onrender.com
```

Do not commit `.env` files containing sensitive information.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The frontend is deployed using Vercel.

The production frontend communicates with the backend deployed on Render.

```text
Vue / Vercel
      │
      │ VITE_API_URL
      ▼
Express / Render
      │
      ▼
MongoDB
```

### Vercel Environment Variable

Configure the following environment variable in the Vercel project:

```text
VITE_API_URL
```

Value:

```text
https://fitness-tracker-app-rjfr.onrender.com
```

## Vue Router Deployment

Because the application uses Vue Router with `createWebHistory`, Vercel should rewrite application routes to `index.html`.

The project includes a `vercel.json` configuration for SPA routing.

## Project Status

The frontend currently supports the core authentication and workout management functionality.

## License

This project is for educational and portfolio purposes.
