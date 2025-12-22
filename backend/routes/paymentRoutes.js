import express from "express";
import {
  payRent,
  getTenantPayments,
  getOwnerPayments
} from "../controllers/paymentController.js";

import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/pay", verifyToken, verifyRole(["tenant"]), payRent);
router.get("/tenant", verifyToken, verifyRole(["tenant"]), getTenantPayments);
router.get("/owner", verifyToken, verifyRole(["owner"]), getOwnerPayments);

export default router;
