import mongoose from "mongoose";

let conn = null;

exports.connectDB = async function() {
  if (conn == null) {
    conn = mongoose.connect("mongodb://mostafa:1989@ac-egbungw-shard-00-00.iqaskof.mongodb.net:27017,ac-egbungw-shard-00-01.iqaskof.mongodb.net:27017,ac-egbungw-shard-00-02.iqaskof.mongodb.net:27017/?ssl=true&replicaSet=atlas-jxqbg0-shard-0&authSource=admin&retryWrites=true&w=majority", {
      serverSelectionTimeoutMS: 5000
    }).then(() => mongoose);

   
    await conn;
  }

  return conn;
};
