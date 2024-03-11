import { Request, Response } from "express"; // Importación de los tipos Request y Response de Express
import RegistrationService from "../services/registration.service"; // Importación del servicio de registro
import eventService from "../services/event.service"; // Importación del servicio de eventos
import userService from "../services/user.service"; // Importación del servicio de usuarios
import { RegistrationDocument, RegistrationInput } from "../models/registration.models"; // Importación de los tipos RegistrationDocument y RegistrationInput del modelo de registro
import { EventDocument } from "../models/event.models"; // Importación del tipo EventDocument del modelo de eventos
import { UserDocument } from "../models/user.models"; // Importación del tipo UserDocument del modelo de usuarios

class registrationController {
    
    // Método para crear una nueva inscripción
    public async create(req: Request, res: Response){
        try {
            // Verificar si el evento existe
            const eventExists: EventDocument | null = await eventService.findByTitle(req.body.title);
            
            // Verificar si el usuario existe
            const userExists: UserDocument | null = await userService.findByEmail(req.body.email);

            // Si el usuario no existe, devolver un mensaje de error
            if(!userExists){
                return res.status(400).json({message: "User doesn't exist"});
            }

            // Si el evento no existe, devolver un mensaje de error
            if(!eventExists){
                return res.status(400).json({message: "Event doesn't exist"});
            }
            
            // Crear una nueva inscripción utilizando los datos del cuerpo de la solicitud
            const registration: RegistrationDocument = await RegistrationService.create(req.body as RegistrationInput);

            // Devolver la inscripción creada con el estado 201 (Creado)
            return res.status(201).json(registration);

        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para obtener todas las inscripciones
    public async getRegistrations(req: Request, res: Response) {

        try {
            // Obtener todas las inscripciones
            const registration = await RegistrationService.findAll();

            // Devolver las inscripciones obtenidas
            res.json(registration);        
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para obtener una inscripción por su ID
    public async findById(req: Request, res: Response){
        try {
            // Buscar una inscripción por su ID
            const registration: RegistrationDocument | null = await RegistrationService.findById(req.params.id);
            
            // Si no se encuentra la inscripción, devolver un mensaje de error
            if(!registration){
                return res.status(404).json({message: "Registration not found"});
            }

            // Devolver la inscripción encontrada
            return res.status(200).json(registration);
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para obtener inscripciones por su título
    public async findByTitle(req: Request, res: Response){
        try {
            // Buscar inscripciones por su título
            const registration: RegistrationDocument[] | null = await RegistrationService.findByTitle(req.body.title);
            
            // Si no se encuentran inscripciones, devolver un mensaje de error
            if(!registration){
                return res.status(404).json({message: "Registration not found"});
            }

            // Devolver las inscripciones encontradas
            return res.status(200).json(registration);
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para obtener inscripciones por el nombre de usuario
    public async findByUserName(req: Request, res: Response){
        try {
            // Buscar inscripciones por el correo electrónico del usuario
            const registration: RegistrationDocument[] | null = await RegistrationService.findByEmail(req.body.email);
            
            // Si no se encuentran inscripciones, devolver un mensaje de error
            if(!registration){
                return res.status(404).json({message: "Registration not found"});
            }

            // Devolver las inscripciones encontradas
            return res.status(200).json(registration);
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para actualizar una inscripción existente
    public async update(req: Request, res: Response){
        try {
            // Verificar si la inscripción existe
            const registrationExists: RegistrationDocument | null = await RegistrationService.findById(req.params.id);

            // Si la inscripción no existe, devolver un mensaje de error
            if(!registrationExists){
                return res.status(404).json({message: "Registration not found"});
            }

            // Actualizar la inscripción utilizando los datos del cuerpo de la solicitud
            const updateRegistration: RegistrationDocument | null = await RegistrationService.update(req.params.id, req.body);

            // Devolver la inscripción actualizada
            return res.status(200).json(updateRegistration);
            
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para eliminar una inscripción existente
    public async delete(req: Request, res: Response){
        try {
            // Verificar si la inscripción existe
            const registrationExists: RegistrationDocument | null = await RegistrationService.findById(req.params.id);

            // Si la inscripción no existe, devolver un mensaje de error
            if(!registrationExists){
                return res.status(404).json({message: "Registration not found"});
            }

            // Eliminar la inscripción
            const  registration : RegistrationDocument | null = await RegistrationService.delete(req.params.id);

            // Devolver un mensaje indicando que la inscripción ha sido eliminada
            return res.status(200).json(`Registration has been deleted ${registration}`);
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

}

export default new registrationController();
