import express from "express";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";
import {
  getTenantTenancies,
  getOwnerTenancies,
  getTenancyById
} from "../controllers/tenancyController.js";

const router = express.Router();

// tenant tenancies
router.get("/", verifyToken, getTenantTenancies);

// owner tenancies
router.get("/owner", verifyToken, verifyRole(["owner"]), getOwnerTenancies);

// single tenancy
router.get("/:id", verifyToken, getTenancyById);

export default router;
