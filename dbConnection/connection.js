import mongoose from "mongoose";

async function connectToMongoDB(DATABASE_URL) {
    try {

        await mongoose.connect(DATABASE_URL)
        console.log('Succesfully connected to MongoDB');
        
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
    }
}

export default connectToMongoDB;