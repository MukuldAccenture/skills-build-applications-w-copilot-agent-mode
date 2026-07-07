"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    focusArea: { type: String, required: true, trim: true },
    equipment: [{ type: String, required: true }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Workout', workoutSchema);
