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

router.post("/", verifyToken, verifyRole(["owner"]), upload.array("images", 5), addProperty);
router.get("/", getAllProperties);
router.get("/owner", verifyToken, verifyRole(["owner"]), getOwnerProperties);
router.get("/filter", filterProperties);
router.get("/:id", getPropertyById);
router.put("/:id", verifyToken, verifyRole(["owner"]), updateProperty);
router.delete("/:id", verifyToken, verifyRole(["owner"]), deleteProperty);
// router.post("/", verifyToken, verifyRole(["owner"]), upload.array("images", 5), addProperty);
// router.post("/properties", upload.single("image"), addProperty);


export default router;
