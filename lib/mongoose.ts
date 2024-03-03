import mongoose from 'mongoose';
export const connectToDB = async () => {
    if (!process.env.NEXT_PUBLIC_MONGODB_URL) {
        return console.log('MongoDB URL not found');
    }
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
        console.log('Connected to DB');
    } catch (error: any) {
        console.log(
            'Something went wrong while connecting to DB',
            error.message
        );
    }
};
