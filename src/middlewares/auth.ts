import { Request, Response, NextFunction } from "express"; // Importación de los tipos Request, Response y NextFunction de Express
import jwt, { TokenExpiredError } from "jsonwebtoken"; // Importación de jwt y TokenExpiredError de la biblioteca jsonwebtoken
import userService from "../services/user.service"; // Importación del servicio de usuarios

// Middleware de autenticación
const auth  =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtener el token de autorización del encabezado de la solicitud
        let token =  req.headers.authorization;

        // Si no se proporciona un token, devolver un mensaje de error de autorización
        if (!token){
            return res.status(401).json({message: "Not authorized"});
        }

        // Eliminar el prefijo 'Bearer' del token
        token = token.replace("Bearer ","");

        // Verificar y decodificar el token JWT
        const  decode: any = jwt.verify(token, process.env.JWT_SECRET || "secret"); 

        // Agregar la información del usuario autenticado al cuerpo de la solicitud
        req.body.loggedUser =  decode;

        // Establecer el ID de usuario en los parámetros de la solicitud
        req.params.id = decode.user_id;

        // Llamar a la función next para continuar con el siguiente middleware o controlador
        next();
        
    } catch(error) {
        // Manejar errores de token expirado o inválido
        if (error instanceof TokenExpiredError)
            return res.status(401).json({message: "Token Expired", error });
        else 
            return res.status(401).json({message: "Token Invalid", error });
    }
}

// Middleware para validar el rol de organizador
const validateOrganizador  =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtener el token de autorización del encabezado de la solicitud
        let token =  req.headers.authorization;

        // Si no se proporciona un token, devolver un mensaje de error de autorización
        if (!token){
            return res.status(401).json({message: "Not authorized"});
        }

        // Eliminar el prefijo 'Bearer' del token
        token = token.replace("Bearer ","");

        // Verificar y decodificar el token JWT
        const  decode: any = jwt.verify(token, process.env.JWT_SECRET || "secret"); 

        // Agregar la información del usuario autenticado al cuerpo de la solicitud
        req.body.loggedUser =  decode;

        // Establecer el ID de usuario en los parámetros de la solicitud
        req.params.id = decode.user_id;

        // Buscar al usuario en la base de datos
        const user = await userService.findById(req.params.id);

        // Si el usuario no existe, devolver un mensaje de error de autorización
        if (!user){
            return res.status(401).json({message: "Not authorized"});
        }

        // Llamar a la función next para continuar con el siguiente middleware o controlador
        next();
    } catch (error) {
        // Manejar errores y devolver un mensaje de error con el estado 500 (Error interno del servidor)
        return res.status(500).json({ message: "Error al validar el rol de organizador", error });
    }
}

// Exportar los middlewares de autenticación
export default auth;
export { validateOrganizador };
