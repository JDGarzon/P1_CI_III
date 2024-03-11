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
const user_service_1 = __importDefault(require("../services/user.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class userController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield user_service_1.default.findByEmail(req.body.email);
                req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
                if (userExists) {
                    return res.status(400).json({ message: "User already exists" });
                }
                const user = yield user_service_1.default.create(req.body);
                return res.status(201).json(user);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.findAll(); //Tiene que esperar que esto termine para continuar
                res.json(users);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield user_service_1.default.findById(req.params.id);
                if (!userExists) {
                    return res.status(404).json({ message: "User not found" });
                }
                const updateUser = yield user_service_1.default.update(req.params.id, req.body);
                return res.status(200).json(updateUser);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield user_service_1.default.findById(req.params.id);
                if (!userExists) {
                    return res.status(404).json({ message: "User not found" });
                }
                const user = yield user_service_1.default.delete(req.params.id);
                return res.status(200).json("User has been deleted {user}");
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield user_service_1.default.findByEmail(req.body.email);
                if (!userExists) {
                    return res.status(401).json({ message: "Not authorized" });
                }
                const isMatch = yield bcrypt_1.default.compare(req.body.password, userExists.password);
                if (!isMatch) {
                    return res.status(401).json({ message: "Not authorized" });
                }
                return res.status(200).json(user_service_1.default.generateToken(userExists));
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
}
exports.default = new userController();
