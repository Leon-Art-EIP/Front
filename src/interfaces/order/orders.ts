export interface Order {
  orderId: string; // ID de la commande
  buyerId: string; // ID de l'acheteur
  buyerName: string; // Nom de l'acheteur
  sellerId: string; // ID du vendeur
  sellerName: string; // Nom du vendeur
  orderState: string; // État de la commande
  paymentStatus: string; // Statut du paiement
  orderPrice: number; // Prix de la commande
  createdAt: string; // Date de création
  updatedAt: string; // Date de mise à jour
  artPublicationId: string; // ID de la publication d'art
  artPublicationName: string; // Nom de la publication d'art
  artPublicationDescription: string; // Description de la publication d'art
  artPublicationPrice: number; // Prix de la publication d'art
  artPublicationImage: string; // URL de l'image de la publication d'art
}
