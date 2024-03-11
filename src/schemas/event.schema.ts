import { object, string } from 'zod'; // Importación de las funciones necesarias de Zod

// Definición del esquema de validación para los eventos utilizando Zod
const eventSchema = object({
    description: string({ required_error: "Title is required" }), // Validación para el campo "description" (título)
    title: string({ required_error: "Email is required" }), // Validación para el campo "title" (correo electrónico)
    time: string({ required_error: "Hour is required" }), // Validación para el campo "time" (hora)
    location: string({ required_error: "Location is required" }), // Validación para el campo "location" (ubicación)
    date: string({ required_error: "Date is required" }), // Validación para el campo "date" (fecha)
});

export default eventSchema; // Exportación del esquema de validación de eventos
