import { Request, Response, Router } from "express";

export const registerNotFound = (app: Router) => {
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: "Not found",
    });
  });
};
