import express from "express";
import { register, login } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router=express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
    res.json({
      message: "Authorized user",
      user: (req as any).user
    });
  });
router.get(
    "/admin",
    protect,
    authorize("admin"),
    (req,res)=>{
      res.json({
         message:"Admin only route"
      });
   });
export default router;