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

router.post("/", verifyToken, upload.array("images", 5), addProperty);
router.get("/", getAllProperties);
router.get("/owner", verifyToken, getOwnerProperties);
router.get("/filter", filterProperties);
router.get("/:id", getPropertyById);
router.put("/:id", verifyToken, updateProperty);
router.delete("/:id", verifyToken, deleteProperty);
// router.post("/", verifyToken, verifyRole(["owner"]), upload.array("images", 5), addProperty);
// router.post("/properties", upload.single("image"), addProperty);


export default router;
