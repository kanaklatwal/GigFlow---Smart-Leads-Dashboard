import express from "express";
import { register, login } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router=express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
    res.json({
      message: "Authorized user",
      userId: req.body.userId
    });
  });
  
export default router;