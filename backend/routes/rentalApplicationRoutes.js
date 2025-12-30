import express from "express";
import {
  applyForProperty,
  getTenantApplications,
  getOwnerApplications,
  getOwnerApplicationById,
  updateApplicationStatus
} from "../controllers/rentalApplicationController.js";

import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= TENANT ================= */
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

/* ================= OWNER ================= */
router.get(
  "/owner",
  verifyToken,
  verifyRole(["owner"]),
  getOwnerApplications
);

router.get(
  "/owner/:id",
  verifyToken,
  verifyRole(["owner"]),
  getOwnerApplicationById
);

router.put(
  "/:id",
  verifyToken,
  verifyRole(["owner"]),
  updateApplicationStatus
);

export default router;
