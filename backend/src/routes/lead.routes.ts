import express from "express";

import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead
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

router.route("/:id")

.get(
 protect,
 getLeadById
)

.put(
 protect,
 authorize("admin"),
 updateLead
)

.delete(
 protect,
 authorize("admin"),
 deleteLead
);

export default router;