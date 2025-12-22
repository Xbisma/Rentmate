import express from "express";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";
import {
  getAllProperties,
  getPropertyById,
  filterProperties
} from "../controllers/propertyController.js";

const router = express.Router();

// Tenant view all properties
router.get("/properties", verifyToken, verifyRole(["tenant"]), getAllProperties);

// Tenant search / filter
router.get("/properties/filter", verifyToken, verifyRole(["tenant"]), filterProperties);

// Tenant view single property
router.get("/properties/:id", verifyToken, verifyRole(["tenant"]), getPropertyById);

export default router;
