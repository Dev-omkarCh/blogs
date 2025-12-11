import mongoose from 'mongoose';
export default async function connectDb(){
    const MONGO_URI = process.env.MOGODB_URL || '';
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Connected to Database`);
    } catch (error) {
        console.log(`Error connecting to Database: ${error}`);
    }
}