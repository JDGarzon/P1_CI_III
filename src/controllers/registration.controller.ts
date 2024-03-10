import { Request, Response } from "express";
import RegistrationService from "../services/registration.service";
import eventService from "../services/event.service";
import userService from "../services/user.service";
import { RegistrationDocument, RegistrationInput } from "../models/registration.models";
import { EventDocument } from "../models/event.models";
import { UserDocument } from "../models/user.models";



class registrationController {
    
    public async create(req: Request, res: Response){
        try {

            const eventExists: EventDocument | null = await eventService.findByTitle(req.body.title);
            const userExists: UserDocument | null = await userService.findByUserName(req.body.userName);

            if(!userExists){
                return res.status(400).json({message: "User doesn't exists"});
            }

            if(!eventExists){
                return res.status(400).json({message: "event doesn't exists"});
            }
            
            const registration: RegistrationDocument = await RegistrationService.create(req.body as RegistrationInput)

            return res.status(201).json(registration);

        } catch(error) {
            return res.status(500).json(error)
        }
    }

    public async getRegistrations(req: Request, res: Response) {

        try {
            const registration = await RegistrationService.findAll(); //Tiene que esperar que esto termine para continuar
            res.json(registration);        
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    public async findById(req: Request, res: Response){
        try {
            const registration: RegistrationDocument | null = await RegistrationService.findById(req.params.id);
            
            if(!registration){
                return res.status(404).json({message: "Registration not found"});
            }

            return res.status(200).json(registration)
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    public async findByTitle(req: Request, res: Response){
        try {
            const registration: RegistrationDocument[] | null = await RegistrationService.findByTitle(req.body.title);
            
            if(!registration){
                return res.status(404).json({message: "Registration not found"});
            }

            return res.status(200).json(registration)
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    public async findByUserName(req: Request, res: Response){
        try {
            const registration: RegistrationDocument[] | null = await RegistrationService.findByUserName(req.body.userName);
            
            if(!registration){
                return res.status(404).json({message: "Registration not found"});
            }

            return res.status(200).json(registration)
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    public async update(req: Request, res: Response){
        try {
            const registrationExists: RegistrationDocument | null = await RegistrationService.findById(req.params.id);

            if(!registrationExists){
                return res.status(404).json({message: "Registration not found"});
            }

            const updateRegistration: RegistrationDocument | null = await RegistrationService.update(req.params.id, req.body);

            return res.status(200).json(updateRegistration)
            
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    public async delete(req: Request, res: Response){
        try {

            const registrationExists: RegistrationDocument | null = await RegistrationService.findById(req.params.id);

            if(!registrationExists){
                return res.status(404).json({message: "Registration not found"});
            }

            const  registration : RegistrationDocument | null = await RegistrationService.delete(req.params.id);

            return res.status(200).json("Registration has been deleted ${registration}");
        } catch(error) {
            return res.status(500).json(error)
        }
    }

}

export default new registrationController();
