// import mongoose from "mongoose";
import mysql from "mysql2";

const db = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "bank",
};

export const conn = mysql.createConnection(db);
const connectDB = conn.connect((err) => {
  if (err) {
    console.log("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database");
});

export default connectDB;
