import { Express } from "express";
import userController from "../controllers/user.controller";
import eventController from "../controllers/event.controller";
import registrationController from "../controllers/registration.controller";
import auth,{validateOrganizador} from "../middlewares/auth";
import validateSchema from "../middlewares/validateSchema";
import  userSchema  from "../schemas/user.schema";
import  eventSchema  from "../schemas/event.schema";

const routes = (app: Express) => {
    app.get('/users', userController.getUsers);
    app.post('/users', validateSchema(userSchema), userController.create);
    app.put('/users/:id', userController.update );
    app.delete('/users/:id', userController.delete );
    app.get('/event',auth, eventController.getEvents);
    app.post('/event', validateOrganizador,validateSchema(eventSchema), eventController.create);
    app.put('/event/:id', validateOrganizador,eventController.update );
    app.delete('/event/:id',validateOrganizador, eventController.delete );
    app.get('/users/profile', auth, userController.findById);
    app.get('/users/:id', userController.findById);
    app.get('/event/:id',auth, eventController.findById);
    app.get('/event/filter/location',auth, eventController.getEventsByLocation);
    app.get('/event/filter/date',auth, eventController.getEventsByDateRange);
    app.post('/login', userController.login);
    app.get('/registration',auth, registrationController.getRegistrations);
    app.post('/registration', auth, registrationController.create);
    app.put('/registration/:id', auth, registrationController.update );
    app.delete('/registration/:id', auth, registrationController.delete );
    app.get('/registration/title',auth, registrationController.findByTitle);
    app.get('/registration/user',auth, registrationController.findByUserName);
    app.get('/registration/:id', auth, registrationController.findById );
};

export default routes;