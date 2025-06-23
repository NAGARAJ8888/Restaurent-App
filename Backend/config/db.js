import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";


export const connectDB = async () => {
    await mongoose.connect(`${MONGODB_URL}/food-del`).then(()=>console.log("DB Connected"));
}