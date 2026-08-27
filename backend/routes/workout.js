const express = require("express");

const {
    addWorkout,
    getMyWorkouts,
    updateWorkout,
    deleteWorkout,
    completeWorkoutStatus
} = require("../controllers/workout");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/addWorkout", protect, addWorkout);
router.get("/getMyWorkouts", protect, getMyWorkouts);
router.put("/updateWorkout/:id", protect, updateWorkout);
router.delete("/deleteWorkout/:id", protect, deleteWorkout);
router.patch("/completeWorkoutStatus/:id", protect, completeWorkoutStatus);

module.exports = router;