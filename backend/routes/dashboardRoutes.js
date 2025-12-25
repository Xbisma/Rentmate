import express from "express";
import {
  tenantDashboard,
  ownerDashboard,
  adminDashboard
} from "../controllers/dashboardController.js";

import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/tenant", verifyToken, tenantDashboard);
router.get("/owner", verifyToken, ownerDashboard);
router.get("/admin", verifyToken, verifyRole(["admin"]), adminDashboard);

export default router;
