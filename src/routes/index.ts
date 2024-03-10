import { Express } from "express";
import userController from "../controllers/user.controller";
import eventController from "../controllers/event.controller";
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
    app.post('/login', userController.login);
};

export default routes;