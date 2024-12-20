export const imageApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

export type TErrorMessages =
  | "Incorrect password"
  | "Email not registered"
  | "Username must be between 3 and 20 characters"
  | "Must be a valid email address"
  | "Title is required"
  | "Main image is required"
  | "Content is required"
  | "Art type is required"
  | "Name is required"
  | "Invalid description"
  | "Invalid dimension"
  | "Invalid for-sale status"
  | "Invalid price"
  | "Invalid location"
  | "Current password is required"
  | "New password must be at least 8 characters long"
  | "Invalid art publication ID"
  | "Collection name is required"
  | "Collection name is required"
  | "Comment text is required"
  | "Password is required"
  | "Objective is required"
  | "Invalid objective"
  | "Art interest types should be an array"
  | "Art selling types should be an array"
  | "Location should be a string"
  | "Custom commands should be a string"
  | "Custom commands can only be 'Yes', 'No', or 'Maybe'"
  | "Budget should be a string"
  | "Discovery method should be a string"
  | "Password is required"
  | "Password must be at least 8 characters long"
  | "Invalid art type"
  | "Invalid price range"
  | "Invalid sale status"
  | "Invalid sort option"
  | "Invalid page number"
  | "Invalid limit number"
  | "Username must contain only letters, numbers, and underscores"
  | "Username is required"
  | "Must be a valid email address"
  | "Password is required"
  | "Password must be at least 8 characters long"
  | "is_artist must be a boolean value"
  | "Invalid User ID"
  | "Comment added"
  | "Cannot delete publication with unfinished orders"
  | "Error: Images Only!"
  | "You can only post once per hour"
  | "Token is not valid"
  | "User has not linked a Stripe account"
  | "Invalid Art Publication ID"
  | "Please wait 10 more minute(s) before creating a new post."
  | "Please wait 9 more minute(s) before creating a new post."
  | "Please wait 8 more minute(s) before creating a new post."
  | "Please wait 7 more minute(s) before creating a new post."
  | "Please wait 6 more minute(s) before creating a new post."
  | "Please wait 5 more minute(s) before creating a new post."
  | "Please wait 4 more minute(s) before creating a new post."
  | "Please wait 3 more minute(s) before creating a new post."
  | "Please wait 2 more minute(s) before creating a new post."
  | "Please wait 1 more minute(s) before creating a new post."
  | "Comment not found"
  | "Incorrect current password"
  | "New password is too weak"
  | "This art has already been sold"
  | "Email already in use";

export const errors: Record<TErrorMessages, string> = {
  "Incorrect password": "Mot de passe incorrect",
  "Email not registered": "Email non enregistré",
  "Username must be between 3 and 20 characters": "Le nom d'utilisateur doit contenir entre 3 et 20 caractères",
  "Must be a valid email address": "L'adresse email doit être valide",
  "Title is required": "Le titre est requis",
  "Main image is required": "L'image principale est requise",
  "Content is required": "Le contenu est requis",
  "Art type is required": "Le type d'art est requis",
  "Name is required": "Le nom est requis",
  "Invalid description": "Description invalide",
  "Invalid dimension": "Dimension invalide",
  "Invalid for-sale status": "Statut de vente invalide",
  "Invalid price": "Prix invalide",
  "Invalid location": "Emplacement invalide",
  "Current password is required": "Le mot de passe actuel est requis",
  "New password must be at least 8 characters long": "Le nouveau mot de passe doit comporter au moins 8 caractères",
  "Invalid art publication ID": "ID de publication d'art invalide",
  "Collection name is required": "Le nom de la collection est requis",
  "Comment text is required": "Le texte du commentaire est requis",
  "Password is required": "Le mot de passe est requis",
  "Objective is required": "L'objectif est requis",
  "Invalid objective": "Objectif invalide",
  "Art interest types should be an array": "Les types d'intérêt artistique doivent être un tableau",
  "Art selling types should be an array": "Les types de vente d'art doivent être un tableau",
  "Location should be a string": "L'emplacement doit être une chaîne de caractères",
  "Custom commands should be a string": "Les commandes personnalisées doivent être une chaîne de caractères",
  "Custom commands can only be 'Yes', 'No', or 'Maybe'":
    "Les commandes personnalisées ne peuvent être que 'Oui', 'Non' ou 'Peut-être'",
  "Budget should be a string": "Le budget doit être une chaîne de caractères",
  "Discovery method should be a string": "La méthode de découverte doit être une chaîne de caractères",
  "Password must be at least 8 characters long": "Le mot de passe doit comporter au moins 8 caractères",
  "Invalid art type": "Type d'art invalide",
  "Invalid price range": "Plage de prix invalide",
  "Invalid sale status": "Statut de vente invalide",
  "Invalid sort option": "Option de tri invalide",
  "Invalid page number": "Numéro de page invalide",
  "Invalid limit number": "Numéro de limite invalide",
  "Username must contain only letters, numbers, and underscores":
    "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et des traits de soulignement",
  "Username is required": "Le nom d'utilisateur est requis",
  "is_artist must be a boolean value": "is_artist doit être une valeur booléenne",
  "Invalid User ID": "ID utilisateur invalide",
  "Comment added": "Commentaire ajouté",
  "Cannot delete publication with unfinished orders":
    "Impossible de supprimer une publication avec des commandes non terminées",
  "Error: Images Only!": "Erreur: Images uniquement",
  "You can only post once per hour": "Vous ne pouvez partager qu'un post par heure",
  "Token is not valid": "Session expirée, veuillez vous reconnecter",
  "User has not linked a Stripe account": "L'utilisateur n'a pas lié de compte Stripe",
  "Invalid Art Publication ID": "Une publication avec cette ID n'existe pas",
  "Please wait 10 more minute(s) before creating a new post.":
    "Veuillez attendre encore 10 minutes avant de créer un nouveau post.",
  "Please wait 9 more minute(s) before creating a new post.":
    "Veuillez attendre encore 9 minutes avant de créer un nouveau post.",
  "Please wait 8 more minute(s) before creating a new post.":
    "Veuillez attendre encore 8 minutes avant de créer un nouveau post.",
  "Please wait 7 more minute(s) before creating a new post.":
    "Veuillez attendre encore 7 minutes avant de créer un nouveau post.",
  "Please wait 6 more minute(s) before creating a new post.":
    "Veuillez attendre encore 6 minutes avant de créer un nouveau post.",
  "Please wait 5 more minute(s) before creating a new post.":
    "Veuillez attendre encore 5 minutes avant de créer un nouveau post.",
  "Please wait 4 more minute(s) before creating a new post.":
    "Veuillez attendre encore 4 minutes avant de créer un nouveau post.",
  "Please wait 3 more minute(s) before creating a new post.":
    "Veuillez attendre encore 3 minutes avant de créer un nouveau post.",
  "Please wait 2 more minute(s) before creating a new post.":
    "Veuillez attendre encore 2 minutes avant de créer un nouveau post.",
  "Please wait 1 more minute(s) before creating a new post.":
    "Veuillez attendre encore 1 minute avant de créer un nouveau post.",
  "Comment not found": "Commentaire introuvable.",
  "Incorrect current password": "Mot de passe actuel incorrect",
  "New password is too weak": "Le nouveau mot de passe est trop faible",
  "This art has already been sold": "Cette oeuvre a déjà été vendue",
  "Email already in use": "Email déjà utilisé",
};

export const RADIUS_MAP = 100; // 100 km autour du user
