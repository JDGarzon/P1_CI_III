import EventModel, {EventInput, EventDocument} from "../models/event.models";

class EventService {

    public async create(eventInput: EventInput ): Promise<EventDocument> {
        try {
            const users = await EventModel.create(eventInput);
            return users;
        } catch(error) {
            throw error;
        }
    }
    
    public async findByTitle(title: any): Promise<EventDocument | null> {
        try {
            const event = await EventModel.findOne({title: title}); 
            return event;
        } catch(error) {
            throw error;
        }
    }

    public async findAll(): Promise<EventDocument[]> {
        try {
            const users = await EventModel.find();
            return users;
        } catch(error) {
            throw error;
        }
    }


    public async update(id: string, eventInput: EventInput): Promise<EventDocument | null> {
        try {
            const event: EventDocument | null = await EventModel.findOneAndUpdate({_id: id}, eventInput, {
                returnOriginal: false
            });
            return event;
        } catch(error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<EventDocument | null> {
        try {
            const user = await EventModel.findById(id);
            return user;
        } catch(error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<EventDocument | null> {
        try { 
            return await EventModel.findOneAndDelete({_id: id});
        } catch(error) {
            throw error;
        }
    }

}

export default new EventService();