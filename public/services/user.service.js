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
const user_models_1 = __importDefault(require("../models/user.models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    create(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_models_1.default.create(userInput);
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_models_1.default.findOne({ email: email });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_models_1.default.findOne({ name: userName });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_models_1.default.find();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_models_1.default.findOneAndUpdate({ _id: id }, userInput, {
                    returnOriginal: false
                });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_models_1.default.findById(id);
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
                return yield user_models_1.default.findOneAndDelete({ _id: id });
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateToken(user) {
        try {
            return jsonwebtoken_1.default.sign({ user_id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "100m" });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new UserService();
