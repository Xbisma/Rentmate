import express from "express";
import { checkRentAlerts, checkLeaseAlerts } from "../services/alertService.js";

const router = express.Router();

router.get("/rent-alerts", async (req, res) => {
  await checkRentAlerts();
  res.json({ message: "Rent alerts triggered" });
});

router.get("/lease-alerts", async (req, res) => {
  await checkLeaseAlerts();
  res.json({ message: "Lease alerts triggered" });
});

export default router;
