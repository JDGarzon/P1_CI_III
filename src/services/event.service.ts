import EventModel, { EventInput, EventDocument } from "../models/event.models"; // Importación del modelo de eventos y sus tipos

class EventService {
    // Método para crear un nuevo evento
    public async create(eventInput: EventInput): Promise<EventDocument> {
        try {
            const event = await EventModel.create(eventInput); // Crear el evento en la base de datos
            return event; // Devolver el evento creado
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para encontrar un evento por su título
    public async findByTitle(title: any): Promise<EventDocument | null> {
        try {
            const event = await EventModel.findOne({ title: title }); // Buscar el evento por su título
            return event; // Devolver el evento encontrado o null si no existe
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para encontrar todos los eventos
    public async findAll(): Promise<EventDocument[]> {
        try {
            const events = await EventModel.find(); // Encontrar todos los eventos
            return events; // Devolver todos los eventos encontrados
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para actualizar un evento
    public async update(id: string, eventInput: EventInput): Promise<EventDocument | null> {
        try {
            const event = await EventModel.findOneAndUpdate({ _id: id }, eventInput, { // Buscar y actualizar el evento por su ID
                returnOriginal: false // Devolver el documento modificado, no el original
            });
            return event; // Devolver el evento actualizado o null si no existe
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para encontrar un evento por su ID
    public async findById(id: string): Promise<EventDocument | null> {
        try {
            const event = await EventModel.findById(id); // Buscar el evento por su ID
            return event; // Devolver el evento encontrado o null si no existe
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para eliminar un evento
    public async delete(id: string): Promise<EventDocument | null> {
        try {
            return await EventModel.findOneAndDelete({ _id: id }); // Encontrar y eliminar el evento por su ID
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para filtrar eventos por rango de fechas
    public async filterByDateRange(startDate: string | null, endDate: string | null): Promise<EventDocument[]> {
        try {
            let filter: any = {}; // Inicializar un objeto para el filtro
    
            if (startDate !== null) { // Si hay una fecha de inicio especificada
                const start = new Date(startDate); // Convertir la fecha de inicio a un objeto Date
                if (isNaN(start.getTime())) { // Verificar si la fecha es válida
                    throw new Error('Invalid start date'); // Lanzar un error si la fecha es inválida
                }
                filter.date = { $gte: start }; // Añadir la condición de fecha de inicio al filtro
            }
            if (endDate !== null) { // Si hay una fecha de finalización especificada
                const end = new Date(endDate); // Convertir la fecha de finalización a un objeto Date
                if (isNaN(end.getTime())) { // Verificar si la fecha es válida
                    throw new Error('Invalid end date'); // Lanzar un error si la fecha es inválida
                }
                filter.date = { ...filter.date, $lte: end }; // Añadir la condición de fecha de finalización al filtro
            }
    
            const events = await EventModel.find(filter).exec(); // Filtrar los eventos según el filtro
    
            return events; // Devolver los eventos filtrados
        } catch (error) {
            throw new Error('Error filtering events by date range: '); // Manejar errores
        }
    }

    // Método para filtrar eventos por ubicación
    public async filterByLocation(location: string | null): Promise<EventDocument[]> {
        try {
            let filter: any = {}; // Inicializar un objeto para el filtro
    
            if (location !== null) { // Si hay una ubicación especificada
                filter.location = location; // Añadir la condición de ubicación al filtro
            }
    
            const events = await EventModel.find(filter).exec(); // Filtrar los eventos según el filtro
    
            return events; // Devolver los eventos filtrados
        } catch (error) {
            throw new Error('Error filtering events by location: '); // Manejar errores
        }
    }
}

export default new EventService(); // Exportar una instancia de EventService
