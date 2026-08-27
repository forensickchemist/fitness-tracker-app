const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message
        });
    }

    // Duplicate MongoDB value
    if (err.code === 11000) {
        return res.status(409).json({
            message: "A record with that value already exists"
        });
    }

    // Default server error
    return res.status(500).json({
        message: "Server error"
    });
};

module.exports = errorMiddleware;