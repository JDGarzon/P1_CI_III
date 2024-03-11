import { Request, Response, NextFunction } from "express"; // Importación de los tipos Request, Response y NextFunction de Express
import { AnyZodObject } from 'zod'; // Importación del tipo AnyZodObject de Zod, para la validación de esquemas de datos

// Función de middleware para validar el esquema de datos de una solicitud
const validateSchema =  (schema: AnyZodObject) => {
    return async  (req: Request, res: Response, next: NextFunction) => {
        try {
            // Parsear y validar el cuerpo de la solicitud con el esquema proporcionado
            await schema.parseAsync(req.body);

            // Si la validación es exitosa, pasar al siguiente middleware o controlador
            next();
        } catch(error){
            // Si hay errores de validación, imprimir el error en la consola y devolver una respuesta de error con el estado 400 (Solicitud incorrecta)
            console.error(error);
            res.status(400).json(error);
        }
    }
}

// Exportar la función de middleware para validar esquemas de datos
export default validateSchema;
