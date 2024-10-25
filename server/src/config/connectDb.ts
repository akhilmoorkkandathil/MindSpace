import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const dbUri = `mongodb+srv://akhildasxyz:${process.env.MONGO_PASSWORD}@cluster0.2pmi0sl.mongodb.net/MindSpaceDB?retryWrites=true&w=majority&appName=Cluster0`
    await mongoose.connect(dbUri)
    console.log('Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas', error);
    process.exit(1);
  }
};

export default connectToDatabase;