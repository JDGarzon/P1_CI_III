import RegistrationModel, { RegistrationInput, RegistrationDocument } from "../models/registration.models"; // Importación del modelo de registro y sus tipos

class RegistrationService {

    // Método para crear un nuevo registro
    public async create(registrationInput: RegistrationInput): Promise<RegistrationDocument> {
        try {
            const registration = await RegistrationModel.create(registrationInput); // Crear el registro en la base de datos
            return registration; // Devolver el registro creado
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para encontrar registros por título
    public async findByTitle(title: any): Promise<RegistrationDocument[] | null> {
        try {
            const registration = await RegistrationModel.find({ title: title }); // Buscar registros por título
            return registration; // Devolver los registros encontrados o null si no hay ninguno
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para encontrar registros por email
    public async findByEmail(email: any): Promise<RegistrationDocument[] | null> {
        try {
            const registration = await RegistrationModel.find({ email: email }); // Buscar registros por email
            return registration; // Devolver los registros encontrados o null si no hay ninguno
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para encontrar todos los registros
    public async findAll(): Promise<RegistrationDocument[]> {
        try {
            const registration = await RegistrationModel.find(); // Encontrar todos los registros
            return registration; // Devolver todos los registros encontrados
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para actualizar un registro
    public async update(id: string, registrationInput: RegistrationInput): Promise<RegistrationDocument | null> {
        try {
            const registration: RegistrationDocument | null = await RegistrationModel.findOneAndUpdate({ _id: id }, registrationInput, { // Buscar y actualizar un registro por su ID
                returnOriginal: false // Devolver el documento modificado, no el original
            });
            return registration; // Devolver el registro actualizado o null si no existe
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para encontrar un registro por su ID
    public async findById(id: string): Promise<RegistrationDocument | null> {
        try {
            const registration = await RegistrationModel.findById(id); // Buscar un registro por su ID
            return registration; // Devolver el registro encontrado o null si no existe
        } catch (error) {
            throw error; // Manejar errores
        }
    }

    // Método para eliminar un registro
    public async delete(id: string): Promise<RegistrationDocument | null> {
        try {
            return await RegistrationModel.findOneAndDelete({ _id: id }); // Encontrar y eliminar un registro por su ID
        } catch (error) {
            throw error; // Manejar errores
        }
    }

}

export default new RegistrationService(); // Exportar una instancia de RegistrationService
