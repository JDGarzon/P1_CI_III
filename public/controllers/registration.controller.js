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
const registration_service_1 = __importDefault(require("../services/registration.service"));
const event_service_1 = __importDefault(require("../services/event.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
class registrationController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventExists = yield event_service_1.default.findByTitle(req.body.title);
                const userExists = yield user_service_1.default.findByEmail(req.body.email);
                if (!userExists) {
                    return res.status(400).json({ message: "User doesn't exists" });
                }
                if (!eventExists) {
                    return res.status(400).json({ message: "event doesn't exists" });
                }
                const registration = yield registration_service_1.default.create(req.body);
                return res.status(201).json(registration);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    getRegistrations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registration = yield registration_service_1.default.findAll(); //Tiene que esperar que esto termine para continuar
                res.json(registration);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registration = yield registration_service_1.default.findById(req.params.id);
                if (!registration) {
                    return res.status(404).json({ message: "Registration not found" });
                }
                return res.status(200).json(registration);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    findByTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registration = yield registration_service_1.default.findByTitle(req.body.title);
                if (!registration) {
                    return res.status(404).json({ message: "Registration not found" });
                }
                return res.status(200).json(registration);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    findByUserName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registration = yield registration_service_1.default.findByEmail(req.body.email);
                if (!registration) {
                    return res.status(404).json({ message: "Registration not found" });
                }
                return res.status(200).json(registration);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registrationExists = yield registration_service_1.default.findById(req.params.id);
                if (!registrationExists) {
                    return res.status(404).json({ message: "Registration not found" });
                }
                const updateRegistration = yield registration_service_1.default.update(req.params.id, req.body);
                return res.status(200).json(updateRegistration);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registrationExists = yield registration_service_1.default.findById(req.params.id);
                if (!registrationExists) {
                    return res.status(404).json({ message: "Registration not found" });
                }
                const registration = yield registration_service_1.default.delete(req.params.id);
                return res.status(200).json("Registration has been deleted ${registration}");
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
}
exports.default = new registrationController();
