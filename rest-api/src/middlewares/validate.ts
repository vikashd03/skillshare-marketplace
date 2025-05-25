import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        errors: result.error.format(),
      });
      return;
    }

    req.body = result.data;

    next();
  };

export default validate;
