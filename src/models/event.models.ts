import mongoose from "mongoose";

export interface EventInput {
    title: string;
    description: string; 
    date: Date;
    time: string;
    location: string;
}

export interface EventDocument extends EventInput, mongoose.Document {
    createdAt: Date;
    upDatedAt: Date;
    deletedAt: Date; 
}

const eventSchema = new mongoose.Schema({
    location: {type: String, required: true},
    description: {type: String, required: true},
    title: {type: String, required: true, index: true, unique: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
}, {timestamps: true, collection: "event"} );

const Event = mongoose.model<EventDocument>("Event", eventSchema);

export default Event;