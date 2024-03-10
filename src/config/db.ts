import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const  connectionString = "mongodb+srv://admin:admin@cluster0.jjgbu2m.mongodb.net/";

export const db = mongoose.connect(connectionString)
                                .then(
                                    () => console.log("Connected to MongoDB") 
                                )
                                .catch(     
                                    (err) => console.log(err)
                                ); 