import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useEffect, useState } from "react";
import { useOrder } from "../../contexts/OrderContext";
import Button from "../lib/Button/Button";
import { OrderRating } from "./OrderRating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { myFetch } from "../../tools/myFetch";

export interface OrderInfoProps {
  orderType: "sell" | "buy";
  deliveryHelpModal: boolean;
  openDeliveryHelpModal: () => void;
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OrderInfo(props: OrderInfoProps): JSX.Element {
  /* c8 ignore start */
  const {
    selectedOrderId,
    selectedOrder,
    fetchOrderInfos,
    handleGoToUserProviderProfile,
    handleGoToChat,
    handleConfirmReception,
    handleCancelOrder,
    handleConfirmSend,
  } = useOrder();

  const [rating, setRating] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (selectedOrderId) {
        await fetchOrderInfos(props.orderType);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrderId]);

  // useEffect(() => {
  //   const fetchProfilePicture = async () => {
  //     if (!selectedOrder) return;

  //     const userId = props.orderType === "buy" ? selectedOrder.sellerId : selectedOrder.buyerId;

  //     if (userId) {
  //       const res = await myFetch({ route: `/api/user/profile/${userId}`, method: "GET" });
  //       if (res.ok) {
  //         const data = res.json;
  //         setProfilePicture(data.profilePicture);
  //       } else {
  //         console.log("Failed to fetch profile picture");
  //       }
  //     }
  //   };

  //   fetchProfilePicture();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedOrder]);

  function onGoToUserProviderProfile() {
    handleGoToUserProviderProfile(props.orderType);
  }

  async function onGoToChat() {
    handleGoToChat(props.orderType);
  }

  function onOpenDeliveryHelpModal() {
    props.openDeliveryHelpModal();
  }

  function deliveryStateNumber(acutalDeliveryState: string) {
    switch (acutalDeliveryState) {
      case "paid":
        return 1;
      case "shipping":
        return 2;
      case "completed":
        return 3;
      default:
        return 1;
    }
  }

  async function onConfirmReception() {
    handleConfirmReception(props.orderType);
  }

  async function onCancelOrder() {
    handleCancelOrder();
  }

  async function onConfirmSend() {
    if (rating > 0 && rating <= 5) handleConfirmSend(props.orderType, rating);
  }

  return (
    <>
      {selectedOrderId && selectedOrder && (
        <div className="flex flex-col p-10 h-full overflow-auto w-full">
          <div className="flex xl:flex-row flex-col gap-10">
            <div className="relative flex flex-col gap-4 w-full">
              <img
                src={`${NEXT_PUBLIC_BACKEND_URL}/api/${selectedOrder.artPublicationImage}`}
                alt="order"
                className=" rounded-2xl"
              />
              <Button color="primary" type="button" onClick={onGoToChat} className="absolute top-[105%] w-full">
                Aller à la conversation
              </Button>
            </div>
            <div className="flex flex-col justify-start items-start gap-12 xl:pt-0 pt-12 w-1/3">
              <span className="text-2xl font-semibold">{selectedOrder.artPublicationName}</span>
              <span className="text-lg line-clamp-5">{selectedOrder.artPublicationDescription}</span>
              <div className="flex flex-row w-full justify-between">
                <button onClick={onGoToUserProviderProfile} className="flex items-center gap-2">
                  <img
                    src={`${NEXT_PUBLIC_BACKEND_URL}/api/${profilePicture}`}
                    alt="user profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xl">
                    {props.orderType === "buy" ? selectedOrder.sellerName : selectedOrder.buyerName}
                  </span>
                </button>
                <span className="text-xl">{selectedOrder.orderPrice}€</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 pt-32">
            <span className="text-2xl">Livraison</span>
            <button onClick={onOpenDeliveryHelpModal}>
              <HelpOutlineIcon />
            </button>
          </div>
          <div className="lg:flex hidden justify-center items-center pt-10 pb-20">
            {selectedOrder.orderState === "cancelled" ? (
              <div className="flex flex-col gap-4">
                <span className="text-2xl">Commande annulée</span>
                <span className="text-lg">Le remboursemenent a été initié</span>
              </div>
            ) : (
              <>
                <div className="flex relative w-8 h-8">
                  <span
                    className={`rounded-full ${
                      deliveryStateNumber(selectedOrder.orderState) >= 1
                        ? "border-[#5a57df] border-2 bg-[#adabff]"
                        : "bg-[#cbcbcb]"
                    } w-full h-full`}
                  />
                  <span
                    className={`absolute top-[120%] text-lg text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
                      selectedOrder.orderState === "paid" && "font-semibold"
                    }`}
                  >
                    Commande payée
                  </span>
                </div>
                <span
                  className={`${
                    deliveryStateNumber(selectedOrder.orderState) >= 2 ? "bg-[#adabff]" : "bg-[#cbcbcb]"
                  } w-40 h-1`}
                ></span>
                <div className="flex relative w-8 h-8">
                  <span
                    className={`rounded-full ${
                      deliveryStateNumber(selectedOrder.orderState) >= 2
                        ? "border-[#5a57df] border-2 bg-[#adabff]"
                        : "bg-[#cbcbcb]"
                    } w-full h-full`}
                  />
                  <span
                    className={`absolute top-[120%] text-lg text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
                      selectedOrder.orderState === "shipping" && "font-semibold"
                    }`}
                  >
                    Commande envoyée
                  </span>
                </div>
                <span
                  className={`${
                    deliveryStateNumber(selectedOrder.orderState) >= 3 ? "bg-[#adabff]" : "bg-[#cbcbcb]"
                  } w-40 h-1`}
                ></span>
                <div className="flex relative w-8 h-8">
                  <span
                    className={`rounded-full ${
                      deliveryStateNumber(selectedOrder.orderState) >= 3
                        ? "border-[#5a57df] border-2 bg-[#adabff]"
                        : "bg-[#cbcbcb]"
                    } w-full h-full`}
                  />
                  <span
                    className={`absolute top-[120%] text-lg text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
                      selectedOrder.orderState === "completed" && "font-semibold"
                    }`}
                  >
                    Commande reçue
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {props.orderType === "sell" && selectedOrder.orderState === "paid" && (
              <Button color="primary" type="button" className="w-full" onClick={onConfirmReception}>
                Confirmer l{"'"}envoi de la commande
              </Button>
            )}
            {props.orderType === "sell" && selectedOrder.orderState === "paid" && (
              <Button color="secondary" type="button" className="w-full" onClick={onCancelOrder}>
                Annuler la commande
              </Button>
            )}
            {props.orderType === "buy" && selectedOrder.orderState === "shipping" && (
              <>
                <OrderRating rating={rating} setRating={setRating} />
                <Button
                  color="primary"
                  type="button"
                  className="w-full"
                  onClick={onConfirmSend}
                  disabled={rating === 0}
                >
                  Confirmer la réception de la commande
                </Button>
              </>
            )}
            {props.orderType === "buy" && selectedOrder.orderState === "completed" && (
              <div className="flex flex-col items-center justify-center gap-4">
                <span className="text-2xl font-semibold text-center">Évaluation</span>
                <span className="text-lg">Vous avez évalué cette commande avec la note de</span>
                <span className="flex items-center text-3xl">
                  {selectedOrder.orderRating} <StarRateRoundedIcon className="text-4xl" />
                </span>
              </div>
            )}
            {props.orderType === "sell" && selectedOrder.orderState === "completed" && (
              <div className="flex flex-col items-center justify-center gap-4">
                <span className="text-2xl font-semibold text-center">Évaluation</span>
                <span className="text-lg">L{"'"}acheteur a évalué cette commande avec la note de</span>
                <span className="flex items-center text-3xl">
                  {selectedOrder.orderRating} <StarRateRoundedIcon className="text-4xl" />
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
  /* c8 ignore stop */
}
