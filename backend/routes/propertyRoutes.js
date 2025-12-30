import express from "express";
import {
  addProperty,
  getAllProperties,
  getOwnerProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  filterProperties
} from "../controllers/propertyController.js";

import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Owner add
router.post("/", verifyToken, verifyRole(["owner"]), upload.array("images", 5), addProperty);

// Get all properties (tenant & public)
router.get("/", getAllProperties);

// Owner properties
router.get("/owner", verifyToken, getOwnerProperties);

// Filter (tenant search)
router.get("/filter", filterProperties);

// Property by ID
router.get("/:id", getPropertyById);

// Update property
router.put("/:id", verifyToken, upload.array("images", 5), updateProperty);

// Delete property
router.delete("/:id", verifyToken, deleteProperty);

export default router;
