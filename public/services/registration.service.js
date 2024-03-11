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
const registration_models_1 = __importDefault(require("../models/registration.models"));
class RegistrationService {
    create(registrationInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registration = yield registration_models_1.default.create(registrationInput);
                return registration;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registration = yield registration_models_1.default.find({ title: title });
                return registration;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registration = yield registration_models_1.default.find({ email: email });
                return registration;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registration = yield registration_models_1.default.find();
                return registration;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, registrationInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registration = yield registration_models_1.default.findOneAndUpdate({ _id: id }, registrationInput, {
                    returnOriginal: false
                });
                return registration;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registration = yield registration_models_1.default.findById(id);
                return registration;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield registration_models_1.default.findOneAndDelete({ _id: id });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new RegistrationService();
