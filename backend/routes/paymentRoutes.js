import express from "express";
import {
  payRent,
  getTenantPayments,
  getOwnerPayments
} from "../controllers/paymentController.js";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// ---------------- TENANT ROUTES ---------------- //

// Tenant pays rent
// POST /api/payments/pay
router.post("/pay", verifyToken, verifyRole(["tenant"]), payRent);

// Tenant payment history
// GET /api/payments/tenant
router.get("/tenant", verifyToken, verifyRole(["tenant"]), getTenantPayments);

// ---------------- OWNER ROUTES ---------------- //

// Owner payment history
// GET /api/payments/owner
router.get("/owner", verifyToken, verifyRole(["owner"]), getOwnerPayments);

export default router;
