const mongoose = require("mongoose");

const Workout = require("../models/Workout");
const asyncHandler = require("../middleware/asyncHandler");

const addWorkout = asyncHandler(async (req, res) => {
    const { name, duration } = req.body;

    if (!name || duration === undefined) {
        return res.status(400).json({
            message: "Name and duration are required"
        });
    }

    const workout = await Workout.create({
        userId: req.user.id,
        name,
        duration
    });

    res.status(201).json(workout);
});

const getMyWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({
        userId: req.user.id
    }).sort({ dateAdded: -1 });

    res.status(200).json(workouts);
});

const updateWorkout = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, duration } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid workout ID"
        });
    }

    const workout = await Workout.findOne({
        _id: id,
        userId: req.user.id
    });

    if (!workout) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }

    if (name !== undefined) {
        workout.name = name;
    }

    if (duration !== undefined) {
        workout.duration = duration;
    }

    await workout.save();

    res.status(200).json(workout);
});

const deleteWorkout = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid workout ID"
        });
    }

    const workout = await Workout.findOneAndDelete({
        _id: id,
        userId: req.user.id
    });

    if (!workout) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }

    res.status(200).json({
        message: "Workout deleted successfully"
    });
});

const completeWorkoutStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid workout ID"
        });
    }

    const workout = await Workout.findOne({
        _id: id,
        userId: req.user.id
    });

    if (!workout) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }

    workout.status = "completed";

    await workout.save();

    res.status(200).json(workout);
});

module.exports = {
    addWorkout,
    getMyWorkouts,
    updateWorkout,
    deleteWorkout,
    completeWorkoutStatus
};