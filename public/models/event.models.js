"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    location: { type: String, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true, index: true, unique: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
}, { timestamps: true, collection: "event" });
const Event = mongoose_1.default.model("Event", eventSchema);
exports.default = Event;
