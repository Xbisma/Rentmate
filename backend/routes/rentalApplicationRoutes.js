import express from "express";
import {
  applyForProperty,
  getTenantApplications,
  getOwnerApplications,
  updateApplicationStatus
} from "../controllers/rentalApplicationController.js";

import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tenant
router.post(
  "/",
  verifyToken,
  verifyRole(["tenant"]),
  applyForProperty
);

router.get(
  "/tenant",
  verifyToken,
  verifyRole(["tenant"]),
  getTenantApplications
);

// Owner
router.get(
  "/owner",
  verifyToken,
  verifyRole(["owner"]),
  getOwnerApplications
);

router.put(
  "/:id",
  verifyToken,
  verifyRole(["owner"]),
  updateApplicationStatus
);

export default router;
