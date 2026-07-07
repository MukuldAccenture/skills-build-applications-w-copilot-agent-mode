"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { _id: false });
const leaderboardSchema = new mongoose_1.Schema({
    weekStart: { type: Date, required: true },
    entries: { type: [leaderboardEntrySchema], required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
