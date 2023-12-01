import mongoose from "mongoose";
import { config } from "dotenv";


config();


const MONGO_URL = process.env.MONGO_URI;

if(!MONGO_URL) {
    throw new Error("No MONGO_URL specified")
}

export const dbConnection = async()=>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to Database')
    } catch (error) {
        console.log("Error connecting to Database")
        process.exit(1);
    }
};