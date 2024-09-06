import mongoose from "mongoose";


let isConnected = false

export const connecteToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB is already connected ')
        return
    }
    try {
        await mongoose.connect(process.env.MONDODB_URI, {
            dbName: 'share-prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true
        console.log('MongoBD Connected');
    } catch (error) {
        console.log(error);
    }
}