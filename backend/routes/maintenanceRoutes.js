import express from "express";
import {
  createMaintenanceRequest,
  getTenantRequests,
  getOwnerRequests,
  updateRequestStatus
} from "../controllers/maintenanceController.js";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tenant routes
router.post(
  "/",
  verifyToken,
  verifyRole(["tenant"]),  // Only tenants can create maintenance requests
  createMaintenanceRequest
);

router.get(
  "/tenant",
  verifyToken,
  verifyRole(["tenant"]),  // Only tenants can view their own requests
  getTenantRequests
);

// Owner routes
router.get(
  "/owner",
  verifyToken,
  verifyRole(["owner"]),  // Only owners can view maintenance requests
  getOwnerRequests
);

router.put(
  "/:id",
  verifyToken,
  verifyRole(["owner"]),  // Only owners can update the status of the requests
  updateRequestStatus
);

export default router;
