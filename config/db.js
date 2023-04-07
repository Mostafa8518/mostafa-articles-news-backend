import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://mostafa:1989@ac-egbungw-shard-00-00.iqaskof.mongodb.net:27017,ac-egbungw-shard-00-01.iqaskof.mongodb.net:27017,ac-egbungw-shard-00-02.iqaskof.mongodb.net:27017/?ssl=true&replicaSet=atlas-jxqbg0-shard-0&authSource=admin&retryWrites=true&w=majority", {
     
    } ,mongoose.set('strictQuery', false));

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export  {connectDB};
