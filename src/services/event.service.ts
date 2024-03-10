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

    public async filterByDateRange(startDate: string | null, endDate: string | null): Promise<EventDocument[]> {
        try {
            let filter: any = {};
    
            if (startDate !== null) {
                const start = new Date(startDate);
                if (isNaN(start.getTime())) {
                    throw new Error('Invalid start date');
                }
                filter.date = { $gte: start };
            }
            if (endDate !== null) {
                const end = new Date(endDate);
                if (isNaN(end.getTime())) {
                    throw new Error('Invalid end date');
                }
                filter.date = { ...filter.date, $lte: end };
            }
    
            const events = await EventModel.find(filter).exec();
    
            return events;
        } catch (error) {
            throw new Error('Error filtering events by date range: ' + error.message);
        }
    }

    public async filterByLocation(location: string | null): Promise<EventDocument[]> {
        try {
            let filter: any = {};
    
            if (location !== null) {
                filter.location = location;
            }
    
            const events = await EventModel.find(filter).exec();
    
            return events;
        } catch (error) {
            throw new Error('Error filtering events by location: ' + error.message);
        }
    }

}

export default new EventService();