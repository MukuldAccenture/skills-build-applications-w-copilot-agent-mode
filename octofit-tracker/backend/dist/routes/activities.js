"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_req, res) => {
    const activities = await Activity_1.default.find()
        .sort({ performedAt: -1 })
        .populate('userId', 'name fitnessLevel')
        .lean();
    res.json(activities);
});
exports.default = activitiesRouter;
