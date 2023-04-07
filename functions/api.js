import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from "cors";

import articleRoutes from "./Routes/articleRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./Routes/uploadRoutes.js";
import serverless from "serverless-http";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const db = async () => {
  try {
    const conn = await mongoose.connect("mongodb://mostafa:1989@ac-egbungw-shard-00-00.iqaskof.mongodb.net:27017,ac-egbungw-shard-00-01.iqaskof.mongodb.net:27017,ac-egbungw-shard-00-02.iqaskof.mongodb.net:27017/?ssl=true&replicaSet=atlas-jxqbg0-shard-0&authSource=admin&retryWrites=true&w=majority", {
     
    } ,mongoose.set('strictQuery', false));

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());

app.use("/.netlify/functions/api/article", articleRoutes);
app.use("/.netlify/functions/api/user", userRoutes);
app.use("/.netlify/functions/api/upload", uploadRoutes);


app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


  app.get("/", (req, res) => {
    res.send("API is running...");
  });


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

const handler = serverless(app);

export { handler };
