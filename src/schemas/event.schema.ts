import  {object, string, TypeOf,date} from 'zod'; 

const eventSchema  = object ({
    description: string({required_error: "Title is required"}),
    title: string({required_error: "Email is required"}),
    time: string({required_error: "Hour is required"}),  
    location: string({required_error: "location is required"}),  
    date: string({required_error: "Date is required"}),
})

export default eventSchema;