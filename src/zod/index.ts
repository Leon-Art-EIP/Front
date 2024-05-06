import { z } from "zod";
import zxcvbn from "zxcvbn";

/* c8 ignore start */

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

export const settingsPasswordSchema = z
  .object({
    password: nonEmptyString,
    newpassword: nonEmptyString,
    confirmpassword: nonEmptyString,
  })
  .superRefine((data, ctx) => {
    if (data.newpassword !== data.confirmpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmpassword"],
      });
    }
  });

export const createArtSchema = z.object({
  image: z.preprocess((arg) => {
    if (typeof File !== "undefined" && arg instanceof File) {
      return arg;
    }
    return new Error("Veuillez sélectionner une image");
  }, z.any()),
  artType: nonEmptyString,
  name: nonEmptyString,
  description: nonEmptyString,
  isForSale: z.boolean(),
  price: z.number().min(0).optional(),
  location: nonEmptyString.optional(),
});

export const createCollectionSchema = z.object({
  collectionName: nonEmptyString,
});

export const profileHeadingSchema = z.object({
  bannerPicture: z.instanceof(File).optional(),
  profilePicture: z.instanceof(File).optional(),
});

export const addCommentSchema = z.object({
  comment: nonEmptyString,
});

/* c8 ignore stop */

export type TLoginData = z.infer<typeof loginSchema>;
export type TRegisterData = z.infer<typeof registerSchema>;
export type TSettingsPasswordData = z.infer<typeof settingsPasswordSchema>;
export type TCreateArtData = z.infer<typeof createArtSchema>;
export type TCreateCollectionData = z.infer<typeof createCollectionSchema>;
export type TProfileHeadingData = z.infer<typeof profileHeadingSchema>;
export type TAddCommentData = z.infer<typeof addCommentSchema>;
