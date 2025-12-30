// backend/server.js

import dotenv from "dotenv";
dotenv.config(); // ✅ Load env first

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import rentalApplicationRoutes from "./routes/rentalApplicationRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import tenancyRoutes from "./routes/tenancyRoutes.js";

import { startCronJobs } from "./utils/cronJobs.js";

const app = express();

// ✅ LOG REQUESTS
app.use((req, res, next) => {
  console.log(`[API HIT] ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Needed for form-data

// ✅ ROUTES
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/tenant", tenantRoutes);
app.use("/api/applications", rentalApplicationRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tenancies", tenancyRoutes);

// ✅ BASE ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ✅ DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ CRON JOBS
startCronJobs();
