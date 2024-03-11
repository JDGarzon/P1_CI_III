import RegistrationModel, {RegistrationInput, RegistrationDocument} from "../models/registration.models";

class RegistrationService {

    public async create(registrationInput: RegistrationInput ): Promise<RegistrationDocument> {
        try {
            const registration = await RegistrationModel.create(registrationInput);
            return registration;
        } catch(error) {
            throw error;
        }
    }

    public async findByTitle(title: any): Promise<RegistrationDocument[] | null> {
        try {
            const registration = await RegistrationModel.find({title: title}); 
            return registration;
        } catch(error) {
            throw error;
        }
    }

    public async findByEmail(email: any): Promise<RegistrationDocument[] | null> {
        try {
            const registration = await RegistrationModel.find({email: email}); 
            return registration;
        } catch(error) {
            throw error;
        }
    }

    public async findAll(): Promise<RegistrationDocument[]> {
        try {
            const registration = await RegistrationModel.find();
            return registration;
        } catch(error) {
            throw error;
        }
    }


    public async update(id: string, registrationInput: RegistrationInput): Promise<RegistrationDocument | null> {
        try {
            const registration: RegistrationDocument | null = await RegistrationModel.findOneAndUpdate({_id: id}, registrationInput, {
                returnOriginal: false
            });
            return registration;
        } catch(error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<RegistrationDocument | null> {
        try {
            const registration = await RegistrationModel.findById(id);
            return registration;
        } catch(error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<RegistrationDocument | null> {
        try { 
            return await RegistrationModel.findOneAndDelete({_id: id});
        } catch(error) {
            throw error;
        }
    }

}

export default new RegistrationService();