import { Request, Response } from "express"; // Importación de los tipos Request y Response de Express
import userService from "../services/user.service"; // Importación del servicio de usuarios
import { UserDocument, UserInput } from "../models/user.models"; // Importación de los tipos UserDocument y UserInput del modelo de usuarios
import bcrypt from "bcrypt"; // Importación de la biblioteca bcrypt para el hashing de contraseñas

class userController {
    
    // Método para crear un nuevo usuario
    public async create(req: Request, res: Response){
        try {
            // Verificar si el usuario ya existe
            const userExists: UserDocument | null = await userService.findByEmail(req.body.email);

            // Hashear la contraseña antes de almacenarla en la base de datos
            req.body.password = await bcrypt.hash(req.body.password, 10);

            // Si el usuario ya existe, devolver un mensaje de error
            if(userExists){
                return res.status(400).json({message: "User already exists"});
            }

            // Crear un nuevo usuario utilizando los datos del cuerpo de la solicitud
            const user: UserDocument = await userService.create(req.body as UserInput);

            // Devolver el usuario creado con el estado 201 (Creado)
            return res.status(201).json(user);

        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para obtener todos los usuarios
    public async getUsers(req: Request, res: Response) {

        try {
            // Obtener todos los usuarios
            const users = await userService.findAll(); // Tiene que esperar que esto termine para continuar
            res.json(users);        
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para obtener un usuario por su ID
    public async findById(req: Request, res: Response){
        try {
            // Buscar un usuario por su ID
            const user: UserDocument | null = await userService.findById(req.params.id);
            
            // Si no se encuentra el usuario, devolver un mensaje de error
            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            // Devolver el usuario encontrado
            return res.status(200).json(user);
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para actualizar un usuario existente
    public async update(req: Request, res: Response){
        try {
            // Verificar si el usuario existe
            const userExists: UserDocument | null = await userService.findById(req.params.id);

            // Si el usuario no existe, devolver un mensaje de error
            if(!userExists){
                return res.status(404).json({message: "User not found"});
            }

            // Actualizar el usuario utilizando los datos del cuerpo de la solicitud
            const updateUser: UserDocument | null = await userService.update(req.params.id, req.body);

            // Devolver el usuario actualizado
            return res.status(200).json(updateUser);
            
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para eliminar un usuario existente
    public async delete(req: Request, res: Response){
        try {
            // Verificar si el usuario existe
            const userExists: UserDocument | null = await userService.findById(req.params.id);

            // Si el usuario no existe, devolver un mensaje de error
            if(!userExists){
                return res.status(404).json({message: "User not found"});
            }

            // Eliminar el usuario
            const  user : UserDocument | null = await userService.delete(req.params.id);

            // Devolver un mensaje indicando que el usuario ha sido eliminado
            return res.status(200).json(`User has been deleted ${user}`);
        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

    // Método para autenticar a un usuario y generar un token JWT
    public async login(req: Request, res: Response){
        try {
            // Verificar si el usuario existe
            const userExists: UserDocument | null = await userService.findByEmail(req.body.email);

            // Si el usuario no existe, devolver un mensaje de error de autenticación
            if(!userExists){
                return res.status(401).json({message: "Not authorized"});
            }

            // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
            const isMatch:boolean  = await bcrypt.compare(req.body.password, userExists.password);

            // Si las contraseñas no coinciden, devolver un mensaje de error de autenticación
            if(!isMatch){
                return res.status(401).json({message: "Not authorized"});
            }
            
            // Generar un token JWT para el usuario autenticado y devolverlo como respuesta
            return res.status(200).json( userService.generateToken(userExists));

        } catch(error) {
            // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
            return res.status(500).json(error);
        }
    }

}

export default new userController();
