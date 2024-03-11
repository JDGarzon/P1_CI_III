import mongoose from "mongoose"; // Importación de mongoose para la definición de modelos y esquemas

// Definición de la interfaz EventInput para especificar la estructura de entrada de los eventos
export interface EventInput {
    title: string;
    description: string;
    date: Date;
    time: string;
    location: string;
}

// Definición de la interfaz EventDocument que extiende de EventInput y mongoose.Document para especificar la estructura de documentos de eventos en la base de datos
export interface EventDocument extends EventInput, mongoose.Document {
    createdAt: Date; // Fecha de creación del evento
    updatedAt: Date; // Fecha de última actualización del evento
    deletedAt: Date; // Fecha de eliminación del evento (si aplica)
}

// Definición del esquema de mongoose para los eventos
const eventSchema = new mongoose.Schema({
    location: { type: String, required: true }, // Ubicación del evento (obligatorio)
    description: { type: String, required: true }, // Descripción del evento (obligatorio)
    title: { type: String, required: true, index: true, unique: true }, // Título del evento (obligatorio, índice único)
    date: { type: Date, required: true }, // Fecha del evento (obligatorio)
    time: { type: String, required: true }, // Hora del evento (obligatorio)
}, {
    timestamps: true, // Habilita automáticamente los campos createdAt y updatedAt
    collection: "event" // Nombre de la colección en la base de datos
});

// Definición del modelo de mongoose para los eventos, utilizando el esquema definido anteriormente
const Event = mongoose.model<EventDocument>("Event", eventSchema);

export default Event; // Exportación del modelo de evento
