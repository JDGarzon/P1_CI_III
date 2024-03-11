import UserModel, { UserInput, UserDocument } from "../models/user.models"; // Importación del modelo de usuario y sus tipos
import jwt from "jsonwebtoken"; // Importación de JWT para generar tokens de autenticación

class UserService {

    // Método para crear un nuevo usuario
    public async create(userInput: UserInput): Promise<UserDocument> {
        try {
            const user = await UserModel.create(userInput); // Crear el usuario en la base de datos
            return user; // Devolver el usuario creado
        } catch (error) {
            throw error; // Manejar errores
        }
    }
    
    // Método para encontrar un usuario por su email
    public async findByEmail(email: any): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findOne({ email: email }); // Buscar un usuario por su email
            return user; // Devolver el usuario encontrado o null si no existe
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para encontrar un usuario por su nombre de usuario
    public async findByUserName(userName: any): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findOne({ name: userName }); // Buscar un usuario por su nombre de usuario
            return user; // Devolver el usuario encontrado o null si no existe
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para encontrar todos los usuarios
    public async findAll(): Promise<UserDocument[]> {
        try {
            const users = await UserModel.find(); // Encontrar todos los usuarios
            return users; // Devolver todos los usuarios encontrados
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para actualizar un usuario
    public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findOneAndUpdate({ _id: id }, userInput, {
                returnOriginal: false // Buscar y actualizar un usuario por su ID
            });
            return user; // Devolver el usuario actualizado o null si no existe
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para encontrar un usuario por su ID
    public async findById(id: string): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findById(id); // Buscar un usuario por su ID
            return user; // Devolver el usuario encontrado o null si no existe
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para eliminar un usuario
    public async delete(id: string): Promise<UserDocument | null> {
        try { 
            return await UserModel.findOneAndDelete({ _id: id }); // Encontrar y eliminar un usuario por su ID
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para generar un token de autenticación para un usuario
    public generateToken(user: UserDocument): string {
        try { 
            return jwt.sign({ user_id: user.id, email: user.email }, // Generar un token JWT con el ID de usuario y email
                process.env.JWT_SECRET || "secret", // Utilizar la clave secreta definida en las variables de entorno o una por defecto
                { expiresIn: "100m" }); // Definir la duración del token
        } catch (error) {
            throw error; // Manejar errores
        }
    }

}

export default new UserService(); // Exportar una instancia de UserService
