const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        duration: {
            type: Number,
            required: true,
            min: 1
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        dateAdded: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending"
        }
    }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;