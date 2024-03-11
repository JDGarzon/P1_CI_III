"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_models_1 = __importDefault(require("../models/event.models"));
class EventService {
    create(eventInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield event_models_1.default.create(eventInput);
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_models_1.default.findOne({ title: title });
                return event;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield event_models_1.default.find();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, eventInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_models_1.default.findOneAndUpdate({ _id: id }, eventInput, {
                    returnOriginal: false
                });
                return event;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield event_models_1.default.findById(id);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield event_models_1.default.findOneAndDelete({ _id: id });
            }
            catch (error) {
                throw error;
            }
        });
    }
    filterByDateRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filter = {};
                if (startDate !== null) {
                    const start = new Date(startDate);
                    if (isNaN(start.getTime())) {
                        throw new Error('Invalid start date');
                    }
                    filter.date = { $gte: start };
                }
                if (endDate !== null) {
                    const end = new Date(endDate);
                    if (isNaN(end.getTime())) {
                        throw new Error('Invalid end date');
                    }
                    filter.date = Object.assign(Object.assign({}, filter.date), { $lte: end });
                }
                const events = yield event_models_1.default.find(filter).exec();
                return events;
            }
            catch (error) {
                throw new Error('Error filtering events by date range: ');
            }
        });
    }
    filterByLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filter = {};
                if (location !== null) {
                    filter.location = location;
                }
                const events = yield event_models_1.default.find(filter).exec();
                return events;
            }
            catch (error) {
                throw new Error('Error filtering events by location: ');
            }
        });
    }
}
exports.default = new EventService();
