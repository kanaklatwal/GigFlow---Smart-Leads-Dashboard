import express from "express";

import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
    assignLead,
    updateLeadStatus,
    getLeadStats
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

router.get(
    "/stats",
    protect,
    getLeadStats
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

router.put(
    "/:id/assign",
    protect,
    authorize("admin","sales"),
    assignLead
);

router.put(
    "/:id/status",
    protect,
    authorize("admin", "sales"),
    updateLeadStatus
);


export default router;