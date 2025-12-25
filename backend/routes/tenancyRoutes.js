import express from "express";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";
import {
  getTenantTenancies,
  getTenancyById
} from "../controllers/tenancyController.js";

const router = express.Router();

// Tenant routes
router.get("/", verifyToken, verifyRole(["tenant"]), getTenantTenancies);
router.get("/:id", verifyToken, verifyRole(["tenant"]), getTenancyById);

export default router;