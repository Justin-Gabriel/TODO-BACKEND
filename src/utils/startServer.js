import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config'

// const app = express();

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(`Could not connect to MongoDB: ${error}`);
    }
}

const startServer = async (app) => {
    try {
        await connectToMongoDB();
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.error(`Error in starting the server: ${error}`);
    }
}

export default startServer;