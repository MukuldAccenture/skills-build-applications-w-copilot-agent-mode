"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: {
        type: String,
        enum: ['run', 'ride', 'strength', 'yoga', 'swim'],
        required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    performedAt: { type: Date, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Activity', activitySchema);
