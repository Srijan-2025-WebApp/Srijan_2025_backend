import mongoose, { mongo } from 'mongoose';
import dotenv from "dotenv"

dotenv.config({
    path: '.env'
})

export const connectDB = async() =>{
    try {
        const instance = await mongoose.connect(process.env.MONGO_URI);
        if(instance){
            console.log('DB Connected Successfully');
        }
    } catch (error) {
        console.log("DB connection Failed: ",error)
        process.exit(0);
    }
}

