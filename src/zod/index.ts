import { z } from "zod";
import { getValueOrUndefined } from "./utils";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nonEmptyString = z.string().min(1, { message: "Veuillez remplir ce champ" });
const nonStringSelected = z.string().min(1, { message: "Veuillez sélectionner au moins un champ" });
const validEmail = nonEmptyString.regex(emailRegex, { message: "Adresse email invalide" });
const validPassword = z
  .string()
  .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
  .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
  .regex(/\d/, { message: "Le mot de passe doit contenir au moins un chiffre" });

export const loginSchema = z.object({
  email: validEmail,
  password: nonEmptyString,
});

export const registerSchema = z.object({
  username: nonEmptyString.max(20, { message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères" }),
  email: validEmail,
  password: validPassword,
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
  image: z.preprocess((file) => {
    if (file instanceof File) return file;
    return undefined;
  }, z.instanceof(File, { message: "Veuillez sélectionner une image" })),
  artType: nonStringSelected,
  name: nonEmptyString,
  description: nonEmptyString,
  isForSale: z.boolean(),
  price: z.preprocess(getValueOrUndefined, z.string().optional()),
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

export const shareArtSchema = z.object({
  message: nonEmptyString,
  id: nonEmptyString,
});

export const newPostSchema = z.object({
  text: nonEmptyString,
});

export type TLoginData = z.infer<typeof loginSchema>;
export type TRegisterData = z.infer<typeof registerSchema>;
export type TSettingsPasswordData = z.infer<typeof settingsPasswordSchema>;
export type TCreateArtData = z.infer<typeof createArtSchema>;
export type TCreateCollectionData = z.infer<typeof createCollectionSchema>;
export type TProfileHeadingData = z.infer<typeof profileHeadingSchema>;
export type TAddCommentData = z.infer<typeof addCommentSchema>;
export type TShareArtData = z.infer<typeof shareArtSchema>;
export type TNewPostData = z.infer<typeof newPostSchema>;
