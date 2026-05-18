import express from "express";

import {
 createLead,
 getLeads
} from "../controllers/lead.controller";

import { protect } from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";

const router = express.Router();

router.route("/")
.post(
 protect,
 authorize("admin"),
 createLead
)

.get(
 protect,
 getLeads
);

export default router;