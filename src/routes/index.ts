import { Express } from "express";
import userController from "../controllers/user.controller";
import eventController from "../controllers/event.controller";
import registrationController from "../controllers/registration.controller";
import auth, { validateOrganizador } from "../middlewares/auth";
import validateSchema from "../middlewares/validateSchema";
import userSchema from "../schemas/user.schema";
import eventSchema from "../schemas/event.schema";

const routes = (app: Express) => {
    // Endpoint para obtener todos los usuarios
    app.get('/users', userController.getUsers);

    // Endpoint para crear un nuevo usuario
    app.post('/users', validateSchema(userSchema), userController.create);

    // Endpoint para actualizar la información de un usuario existente
    app.put('/users/:id', userController.update );

    // Endpoint para eliminar un usuario existente
    app.delete('/users/:id', userController.delete );

    // Endpoint para obtener todos los eventos
    app.get('/event', auth, eventController.getEvents);

    // Endpoint para obtener un evento por su ID
    app.get('/event/:eventid', auth, eventController.findById);

    // Endpoint para crear un nuevo evento
    app.post('/event', validateOrganizador, validateSchema(eventSchema), eventController.create);

    // Endpoint para actualizar la información de un evento existente
    app.put('/event/:eventid', validateOrganizador, eventController.update );

    // Endpoint para eliminar un evento existente
    app.delete('/event/:eventid', validateOrganizador, eventController.delete );

    // Endpoint para obtener el perfil del usuario autenticado
    app.get('/users/profile', auth, userController.findById);

    // Endpoint para obtener la información de un usuario específico por ID
    app.get('/users/:id', userController.findById);

    // Endpoint para obtener una lista de eventos filtrados por ubicación
    app.get('/event/filter/location', auth, eventController.getEventsByLocation);

    // Endpoint para obtener una lista de eventos filtrados por rango de fechas
    app.get('/event/filter/date', auth, eventController.getEventsByDateRange);

    // Endpoint para iniciar sesión de usuario
    app.post('/login', userController.login);

    // Endpoint para obtener una lista de inscripciones
    app.get('/registration', auth, registrationController.getRegistrations);

    // Endpoint para crear una nueva inscripción
    app.post('/registration', auth, registrationController.create);

    // Endpoint para actualizar la información de una inscripción existente
    app.put('/registration/:rid', auth, registrationController.update );

    // Endpoint para eliminar una inscripción existente
    app.delete('/registration/:rid', auth, registrationController.delete );

    // Endpoint para obtener una lista de inscripciones filtradas por título
    app.get('/registration/title', auth, registrationController.findByTitle);

    // Endpoint para obtener una lista de inscripciones filtradas por nombre de usuario
    app.get('/registration/user', auth, registrationController.findByUserName);

    // Endpoint para obtener la información de una inscripción específica por ID
    app.get('/registration/:rid', auth, registrationController.findById);

    
};

export default routes;
