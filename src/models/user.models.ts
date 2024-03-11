import mongoose from "mongoose"; // Importación de mongoose para la definición de modelos y esquemas

// Definición de la interfaz UserInput para especificar la estructura de entrada de los usuarios
export interface UserInput {
    name: string; // Nombre del usuario
    email: string; // Correo electrónico del usuario
    password: string; // Contraseña del usuario
    role: string; // Rol del usuario
}

// Definición de la interfaz UserDocument que extiende de UserInput y mongoose.Document para especificar la estructura de documentos de usuarios en la base de datos
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date; // Fecha de creación del usuario
    updatedAt: Date; // Fecha de última actualización del usuario
    deletedAt: Date; // Fecha de eliminación del usuario (si aplica)
}

// Definición del esquema de mongoose para los usuarios
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre del usuario (obligatorio)
    email: { type: String, required: true, index: true, unique: true }, // Correo electrónico del usuario (obligatorio, índice único)
    password: { type: String, required: true }, // Contraseña del usuario (obligatorio)
    role: { type: String, required: true }, // Rol del usuario (obligatorio)
}, {
    timestamps: true, // Habilita automáticamente los campos createdAt y updatedAt
    collection: "users" // Nombre de la colección en la base de datos
});

// Definición del modelo de mongoose para los usuarios, utilizando el esquema definido anteriormente
const User = mongoose.model<UserDocument>("User", userSchema);

export default User; // Exportación del modelo de usuario
