import { z } from "zod";
import zxcvbn from "zxcvbn";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nonEmptyString = z.string().min(1, { message: "Veuillez remplir ce champ" });
const validEmail = nonEmptyString.regex(emailRegex, { message: "Adresse email invalide" });

export const loginSchema = z.object({
  email: validEmail,
  password: nonEmptyString,
});

export const registerSchema = z
  .object({
    username: nonEmptyString.max(20, { message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères" }),
    email: validEmail,
    password: nonEmptyString,
    conscent: z.boolean({
      required_error: "Vous devez accepter les conditions d'utilisation",
      invalid_type_error: "conscent must be a boolean",
    }),
  })
  .superRefine((data, ctx) => {
    if (zxcvbn(data.password).score < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mot de passe trop faible",
        path: ["password"],
      });
    }
  });

export type TLoginData = z.infer<typeof loginSchema>;
export type TRegisterData = z.infer<typeof registerSchema>;