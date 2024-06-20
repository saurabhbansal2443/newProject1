import mongoose from "mongoose";
import 'dotenv/config'

async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB connected ");
  } catch (error) {
   console.log(error);
  }
}

export default dbConnection;
