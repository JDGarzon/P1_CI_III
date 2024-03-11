import { Request, Response } from "express"; // Importación de los tipos Request y Response de Express
import eventService from "../services/event.service"; // Importación del servicio de eventos
import { EventDocument, EventInput } from "../models/event.models"; // Importación de los tipos EventDocument y EventInput del modelo de eventos

class eventController {

    // Método para crear un nuevo evento
    public async create(req: Request, res: Response){
        try {
            // Verificar si ya existe un evento con el mismo título
            const eventExists: EventDocument | null = await eventService.findByTitle(req.body.title);

            // Si el evento ya existe, devolver un mensaje de error
            if(eventExists){
                return res.status(400).json({message: "Event already exists"});
            }

            // Crear un nuevo evento utilizando los datos del cuerpo de la solicitud
            const event: EventDocument = await eventService.create(req.body as EventInput);

            // Devolver el evento creado con el estado 201 (Creado)
            return res.status(201).json(event);

        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para obtener todos los eventos
    public async getEvents(req: Request, res: Response) {
        try {
            // Obtener todos los eventos
            const events = await eventService.findAll();

            // Devolver los eventos obtenidos
            res.json(events);        
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para obtener un evento por su ID
    public async findById(req: Request, res: Response){
        try {
            // Buscar un evento por su ID

            const event: EventDocument | null = await eventService.findByTitle(req.params.eventid);
            // Si no se encuentra el evento, devolver un mensaje de error
            if(!event){
                return res.status(404).json({message: req.params});
            }

            // Devolver el evento encontrado
            return res.status(200).json(event);
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para actualizar un evento existente
    public async update(req: Request, res: Response){
        try {
            // Verificar si el evento existe
            const eventExists: EventDocument | null = await eventService.findByTitle(req.params.eventid);

            // Si el evento no existe, devolver un mensaje de error
            if(!eventExists){
                return res.status(404).json({message: "Event not found"});
            }

            // Actualizar el evento utilizando los datos del cuerpo de la solicitud
            const updateEvent: EventDocument | null = await eventService.update(req.body.title, req.body);

            // Devolver el evento actualizado
            return res.status(200).json(updateEvent);
            
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para eliminar un evento existente
    public async delete(req: Request, res: Response){
        try {
            // Verificar si el evento existe
            const eventExists: EventDocument | null = await eventService.findByTitle(req.params.eventid);

            // Si el evento no existe, devolver un mensaje de error
            if(!eventExists){
                return res.status(404).json({message: "Event not found"});
            }

            // Eliminar el evento
            const event: EventDocument | null = await eventService.delete(req.body.title);

            // Devolver un mensaje indicando que el evento ha sido eliminado
            return res.status(200).json(`Event has been deleted ${event}`);
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para obtener eventos filtrados por rango de fechas
    public async getEventsByDateRange(req: Request, res: Response) {
        try {
            // Obtener la fecha de inicio y la fecha de fin del cuerpo de la solicitud
            const { startDate, endDate } = req.body;

            // Filtrar eventos por rango de fechas
            const events = await eventService.filterByDateRange(startDate, endDate);

            // Devolver los eventos filtrados
            res.json(events);
        } catch (error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            console.error('Error at filtering events by date range:', error);
            res.status(500).json({ message: 'Error at filtering events by date range' });
        }
    }

    // Método para obtener eventos filtrados por ubicación
    public async getEventsByLocation(req: Request, res: Response) {
        try {
            // Obtener la ubicación del cuerpo de la solicitud
            const { location } = req.body;

            // Filtrar eventos por ubicación
            const events = await eventService.filterByLocation(location);

            // Devolver los eventos filtrados
            res.json(events);
        } catch (error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            console.error('Error at filtering events by location:', error);
            res.status(500).json({ message: 'Error at filtering events by location' });
        }
    }

}

export default new eventController();
