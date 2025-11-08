import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
// import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

connectDB();


app.use("/api/user",userRoutes)
app.use("/api/transaction",transactionRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

console.log("Hello world");
