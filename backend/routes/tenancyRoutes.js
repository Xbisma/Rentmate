import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getTenantTenancies,
  getTenancyById
} from "../controllers/tenancyController.js";

const router = express.Router();

// Tenant routes
router.get("/", verifyToken, getTenantTenancies);
router.get("/:id", verifyToken, getTenancyById);

export default router;