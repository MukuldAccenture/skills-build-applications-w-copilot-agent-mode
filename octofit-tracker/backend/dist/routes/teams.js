"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', async (_req, res) => {
    const teams = await Team_1.default.find().populate('captainId', 'name email').populate('memberIds', 'name').lean();
    res.json(teams);
});
exports.default = teamsRouter;
