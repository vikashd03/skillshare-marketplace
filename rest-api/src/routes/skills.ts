import { Router } from "express";
import {
  addSkill,
  getAllSkills,
  getMySkills,
  updateSkill,
  deleteSkill,
} from "@/controllers/skill";

const router = Router();

router.post("/new", addSkill);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);
router.get("/me", getMySkills);
router.get("/all", getAllSkills);

export default router;
