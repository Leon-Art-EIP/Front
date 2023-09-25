export interface QuizzResultDTO {
  user: string;
  objective: "sell" | "discover" | "both";
  artInterestType: string[]; // Quel type d’art vous intéresse ?
  artSellingType: string[]; // Que comptez-vous vendre ?
  location: string; // Not implemented yet
  customCommands: string; // Souhaitez-vous proposer des créations personnalisées ?
  budget: string; // Quel est votre budget ?
  discoveryMethod: string; // Comment avez-vous découvert Artips ?
}