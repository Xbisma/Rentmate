import express from "express";
import {
  createMaintenanceRequest,
  getTenantRequests,
  getOwnerRequests,
  updateRequestStatus
} from "../controllers/maintenanceController.js";

import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tenant
router.post(
  "/",
  verifyToken,
  verifyRole(["tenant"]),
  createMaintenanceRequest
);

router.get(
  "/tenant",
  verifyToken,
  verifyRole(["tenant"]),
  getTenantRequests
);

// Owner
router.get(
  "/owner",
  verifyToken,
  verifyRole(["owner"]),
  getOwnerRequests
);

router.put(
  "/:id",
  verifyToken,
  verifyRole(["owner"]),
  updateRequestStatus
);

export default router;
