import { Request, Response } from "express";
import prisma from "@/config/db";
import { UserRequest } from "@/utils/models";

export const addSkill = async (req: UserRequest, res: Response) => {
  try {
    const data = req.body;
    const user_id = req.user?.id;

    if (!user_id) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    await prisma.skill.create({
      data: { ...data, provider_id: user_id },
    });

    res.status(200).json({ msg: "Skill Created" });
  } catch (err: any) {
    console.error("Error adding skill:", err);
    res.status(500).json({ error: "Failed to add skill", detail: err.message });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const skillId = req.params.id;
    const data = req.body;

    await prisma.skill.update({
      where: { id: skillId },
      data,
    });

    res.status(200).json({ msg: "Skill Updated" });
  } catch (err: any) {
    console.error("Error updating skill:", err);
    res
      .status(500)
      .json({ error: "Failed to update skill", detail: err.message });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skillId = req.params.id;
    await prisma.skill.delete({
      where: {
        id: skillId,
      },
    });
    res.status(200).json({
      msg: "Skill Deleted",
    });
  } catch (err: any) {
    console.error("Error deleting skill:", err);
    res
      .status(500)
      .json({ error: "Failed to delete skill", detail: err.message });
  }
};

export const getMySkills = async (req: UserRequest, res: Response) => {
  try {
    const user_id = req.user?.id;
    const skills = await prisma.skill.findMany({
      where: {
        provider_id: user_id,
      },
      include: {
        provider: {
          select: {
            name: true,
            company_name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.status(200).json(skills);
  } catch (err: any) {
    console.error("Error fetching skills:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch skills", detail: err.message });
  }
};

export const getAllSkills = async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        provider: {
          select: {
            name: true,
            company_name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.status(200).json(skills);
  } catch (err: any) {
    console.error("Error fetching skills:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch skills", detail: err.message });
  }
};
