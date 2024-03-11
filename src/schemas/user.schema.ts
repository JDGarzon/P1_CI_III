import { object, string } from 'zod'; // Importación de las funciones necesarias de Zod

// Definición del esquema de validación para los usuarios utilizando Zod
const userSchema = object({
    name: string({ required_error: "Name is required" }), // Validación para el campo "name" (nombre)
    email: string({ required_error: "Email is required" }) // Validación para el campo "email" (correo electrónico)
        .email("Not a valid email address"), // Validación adicional para asegurar que el valor sea un correo electrónico válido
    password: string({ required_error: "Password is required" }) // Validación para el campo "password" (contraseña)
        .min(8, "Password must be at least 8 characters long") // Validación adicional para asegurar que la contraseña tenga al menos 8 caracteres
});

export default userSchema; // Exportación del esquema de validación de usuarios
