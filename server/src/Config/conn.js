// import mongoose from "mongoose";
import mysql from "mysql2";

const db = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
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
