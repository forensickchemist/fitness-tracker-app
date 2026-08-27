require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/database");

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Database connection
connectDB();

//Routes
app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

//Error handling
app.use(errorMiddleware);

//Root route
app.get("/", (req, res) => {
	res.status(200).json({
		message: "Fitness Tracker API is running"
	});
});

//Handle unknown routes
app.use((req, res) => {
	res.status(404).json({
		message: "Route not found"
	});
});

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};