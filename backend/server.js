import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import rentalApplicationRoutes from "./routes/rentalApplicationRoutes.js";


dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/applications", rentalApplicationRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// base route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
