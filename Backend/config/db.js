import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;


export const connectDB = async () => {
    await mongoose.connect(MONGODB_URL).then(()=>console.log("DB Connected"));
}