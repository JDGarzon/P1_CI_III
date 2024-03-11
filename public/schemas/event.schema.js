"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const eventSchema = (0, zod_1.object)({
    description: (0, zod_1.string)({ required_error: "Title is required" }),
    title: (0, zod_1.string)({ required_error: "Email is required" }),
    time: (0, zod_1.string)({ required_error: "Hour is required" }),
    location: (0, zod_1.string)({ required_error: "location is required" }),
    date: (0, zod_1.string)({ required_error: "Date is required" }),
});
exports.default = eventSchema;
