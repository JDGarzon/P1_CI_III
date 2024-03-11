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
const event_service_1 = __importDefault(require("../services/event.service"));
class eventController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventExists = yield event_service_1.default.findByTitle(req.body.title);
                if (eventExists) {
                    return res.status(400).json({ message: "event already exists" });
                }
                const event = yield event_service_1.default.create(req.body);
                return res.status(201).json(event);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    getEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield event_service_1.default.findAll(); //Tiene que esperar que esto termine para continuar
                res.json(events);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_service_1.default.findById(req.params.id);
                if (!event) {
                    return res.status(404).json({ message: "Event not found" });
                }
                return res.status(200).json(event);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventExists = yield event_service_1.default.findById(req.params.id);
                if (!eventExists) {
                    return res.status(404).json({ message: "Event not found" });
                }
                const updateevent = yield event_service_1.default.update(req.params.id, req.body);
                return res.status(200).json(updateevent);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventExists = yield event_service_1.default.findById(req.params.id);
                if (!eventExists) {
                    return res.status(404).json({ message: "Event not found" });
                }
                const event = yield event_service_1.default.delete(req.params.id);
                return res.status(200).json("Event has been deleted ${event}");
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    getEventsByDateRange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate } = req.body;
                const events = yield event_service_1.default.filterByDateRange(startDate, endDate);
                res.json(events);
            }
            catch (error) {
                console.error('Error at filtering events by date range:', error);
                res.status(500).json({ message: 'Error at filtering events by date range' });
            }
        });
    }
    getEventsByLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { location } = req.body;
                const events = yield event_service_1.default.filterByLocation(location);
                res.json(events);
            }
            catch (error) {
                console.error('Error at filtering events by location:', error);
                res.status(500).json({ message: 'Error at filtering events by location' });
            }
        });
    }
}
exports.default = new eventController();
