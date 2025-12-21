import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { verifyToken, verifyRole} from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/private", verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

router.get("/owner-only", verifyToken, verifyRole(["owner"]), (req, res) => {
  res.json({ message: "Owner access granted" });
});

export default router;
