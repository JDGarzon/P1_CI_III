import mongoose from "mongoose"; // Importación de mongoose para la definición de modelos y esquemas

// Definición de la interfaz RegistrationInput para especificar la estructura de entrada de las inscripciones
export interface RegistrationInput {
    title: string; // Título de la inscripción
    email: string; // Correo electrónico asociado a la inscripción
}

// Definición de la interfaz RegistrationDocument que extiende de RegistrationInput y mongoose.Document para especificar la estructura de documentos de inscripciones en la base de datos
export interface RegistrationDocument extends RegistrationInput, mongoose.Document {
    createdAt: Date; // Fecha de creación de la inscripción
    updatedAt: Date; // Fecha de última actualización de la inscripción
    deletedAt: Date; // Fecha de eliminación de la inscripción (si aplica)
}

// Definición del esquema de mongoose para las inscripciones
const registrationSchema = new mongoose.Schema({
    email: { type: String, required: true }, // Correo electrónico asociado a la inscripción (obligatorio)
    title: { type: String, required: true }, // Título de la inscripción (obligatorio)
}, {
    timestamps: true, // Habilita automáticamente los campos createdAt y updatedAt
    collection: "registration" // Nombre de la colección en la base de datos
});

// Definición del modelo de mongoose para las inscripciones, utilizando el esquema definido anteriormente
const Registration = mongoose.model<RegistrationDocument>("Registration", registrationSchema);

export default Registration; // Exportación del modelo de inscripción
