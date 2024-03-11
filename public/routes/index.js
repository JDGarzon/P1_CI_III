"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const event_controller_1 = __importDefault(require("../controllers/event.controller"));
const registration_controller_1 = __importDefault(require("../controllers/registration.controller"));
const auth_1 = __importStar(require("../middlewares/auth"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const event_schema_1 = __importDefault(require("../schemas/event.schema"));
const routes = (app) => {
    app.get('/users', user_controller_1.default.getUsers);
    app.post('/users', (0, validateSchema_1.default)(user_schema_1.default), user_controller_1.default.create);
    app.put('/users/:id', user_controller_1.default.update);
    app.delete('/users/:id', user_controller_1.default.delete);
    app.get('/event', auth_1.default, event_controller_1.default.getEvents);
    app.post('/event', auth_1.validateOrganizador, (0, validateSchema_1.default)(event_schema_1.default), event_controller_1.default.create);
    app.put('/event/:id', auth_1.validateOrganizador, event_controller_1.default.update);
    app.delete('/event/:id', auth_1.validateOrganizador, event_controller_1.default.delete);
    app.get('/users/profile', auth_1.default, user_controller_1.default.findById);
    app.get('/users/:id', user_controller_1.default.findById);
    app.get('/event/:id', auth_1.default, event_controller_1.default.findById);
    app.get('/event/filter/location', auth_1.default, event_controller_1.default.getEventsByLocation);
    app.get('/event/filter/date', auth_1.default, event_controller_1.default.getEventsByDateRange);
    app.post('/login', user_controller_1.default.login);
    app.get('/registration', auth_1.default, registration_controller_1.default.getRegistrations);
    app.post('/registration', auth_1.default, registration_controller_1.default.create);
    app.put('/registration/:id', auth_1.default, registration_controller_1.default.update);
    app.delete('/registration/:id', auth_1.default, registration_controller_1.default.delete);
    app.get('/registration/title', auth_1.default, registration_controller_1.default.findByTitle);
    app.get('/registration/user', auth_1.default, registration_controller_1.default.findByUserName);
    app.get('/registration/:id', auth_1.default, registration_controller_1.default.findById);
};
exports.default = routes;
