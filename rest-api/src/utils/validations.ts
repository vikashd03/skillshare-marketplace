import { z } from "zod";
import { ROLE, USER_TYPE } from "./models";

export const signupUserSchema = z
  .object({
    role: z.enum([ROLE.USER, ROLE.PROVIDER]).default(ROLE.USER),
    user_type: z
      .enum([USER_TYPE.INDIVIDUAL, USER_TYPE.COMPANY])
      .default(USER_TYPE.INDIVIDUAL),

    // Common Fields
    email: z.string().email(),
    ph_no: z.string().min(5), // You can add stricter phone validation
    password: z.string().min(6),
    address: z.string().optional(),

    // Individual fields
    name: z.string().optional(),

    // Company fields
    rep_name: z.string().optional(),
    company_name: z.string().optional(),
    tax_no: z
      .string()
      .regex(/^[A-Z0-9]{10}$/, "Invalid tax number format")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.user_type === USER_TYPE.INDIVIDUAL) {
      if (!data.name) {
        ctx.addIssue({
          path: ["name"],
          code: "custom",
          message: "Name is required for individual users.",
        });
      }
    }

    if (data.user_type === USER_TYPE.COMPANY) {
      if (!data.rep_name) {
        ctx.addIssue({
          path: ["rep_name"],
          code: "custom",
          message: "Representative name is required for company users.",
        });
      }
      if (!data.company_name) {
        ctx.addIssue({
          path: ["company_name"],
          code: "custom",
          message: "Company name is required for company users.",
        });
      }
      if (!data.tax_no) {
        ctx.addIssue({
          path: ["tax_no"],
          code: "custom",
          message: "Tax number is required for company users.",
        });
      }
    }
  });

export const signinUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
