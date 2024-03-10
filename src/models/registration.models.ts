import mongoose from "mongoose";

export interface RegistrationInput {
    title: string;
    email: string; 
}

export interface RegistrationDocument extends RegistrationInput, mongoose.Document {
    createdAt: Date;
    upDatedAt: Date;
    deletedAt: Date; 
}

const registrationSchema = new mongoose.Schema({
    email: {type: String, required: true},
    title: {type: String, required: true},
}, {timestamps: true, collection: "registration"} );

const Registration = mongoose.model<RegistrationDocument>("Registration", registrationSchema);

export default Registration;