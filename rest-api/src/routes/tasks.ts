import { Router } from "express";
import {
  createTask,
  getTask,
  getMyTasks,
  offerForTask,
  updateTaskStatus,
  updateTaskOfferRsvp,
  updateCompletionRsvp,
} from "@/controllers/tasks";

const router = Router();

router.post("/new", createTask);
router.get("/me", getMyTasks);
router.get("/:id", getTask);
router.post("/:id/offer", offerForTask);
router.put("/:id/offer/rsvp", updateTaskOfferRsvp);
router.put("/:id/status", updateTaskStatus);
router.put("/:id/complete/rsvp", updateCompletionRsvp);

export default router;
