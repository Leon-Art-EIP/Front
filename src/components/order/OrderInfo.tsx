import { useEffect, useState } from "react";
import { Order } from "../../interfaces/order/orders";
import Button from "../lib/Button/Button";
import { useRouter } from "next/navigation";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface OrderInfoProps {
  selectedOrder: Order | undefined;
  deliveryHelpModal: boolean;
  openDeliveryHelpModal: () => void;
}

export default function OrderInfo(props: OrderInfoProps): JSX.Element {
  const router = useRouter();

  function onGoToUserProviderProfile() {
    router.push(`/profile/${props.selectedOrder?.orderUserProviderId}`);
  }

  function onGoToChat() {}

  function onOpenDeliveryHelpModal() {
    props.openDeliveryHelpModal();
  }

  function deliveryStateNumber(acutalDeliveryState: string) {
    switch (acutalDeliveryState) {
      case "preparation":
        return 1;
      case "sent":
        return 2;
      case "in coming":
        return 3;
      case "arrived":
        return 4;
      default:
        return 1;
    }
  }

  return (
    <>
      {props.selectedOrder && (
        <div className="flex flex-col p-10 h-full overflow-auto">
          <div className="flex lg:flex-row flex-col gap-10">
            <div className="relative flex flex-col gap-4 max-w-2xl h-fit max-h-[450px] flex-shrink-0">
              <img
                src={props.selectedOrder.orderPicture}
                alt="order"
                className="w-full h-full max-h-[450px] object-cover object-center rounded-xl"
              />
              <Button color="primary" type="button" onClick={onGoToChat} className="absolute top-[105%] w-full">
                Aller à la conversation
              </Button>
            </div>
            <div className="flex flex-col justify-start items-start gap-12 pt-4">
              <span className="text-2xl font-semibold">{props.selectedOrder.orderTitle}</span>
              <span className="text-lg line-clamp-5">{props.selectedOrder.orderDescription}</span>
              <div className="flex flex-row w-full justify-between">
                <button onClick={onGoToUserProviderProfile}>
                  <span className="text-xl">{props.selectedOrder.orderUserProviderName}</span>
                </button>
                <span className="text-xl">{props.selectedOrder.orderPrice}€</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 pt-24">
            <span className="text-2xl">Livraison</span>
            <button onClick={onOpenDeliveryHelpModal}>
              <HelpOutlineIcon />
            </button>
          </div>
          <div className="lg:flex hidden justify-center items-center pt-10 pb-20">
            <div className="flex relative w-8 h-8">
              <span className={`rounded-full ${deliveryStateNumber(props.selectedOrder.orderDeliveryState) >= 1 ? "border-[#5a57df] border-2 bg-[#adabff]" : "bg-[#cbcbcb]" } w-full h-full`} />
              <span className={`absolute top-[120%] text-lg text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap ${props.selectedOrder.orderDeliveryState === "preparation" && "font-semibold"}`}>
                Préparation de la
                <br /> commande
              </span>
            </div>
            <span className={`${deliveryStateNumber(props.selectedOrder.orderDeliveryState) >= 2 ? "bg-[#adabff]" : "bg-[#cbcbcb]" } w-40 h-1`}></span>
            <div className="flex relative w-8 h-8">
              <span className={`rounded-full ${deliveryStateNumber(props.selectedOrder.orderDeliveryState) >= 2 ? "border-[#5a57df] border-2 bg-[#adabff]" : "bg-[#cbcbcb]" } w-full h-full`} />
              <span className={`absolute top-[120%] text-lg text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap ${props.selectedOrder.orderDeliveryState === "sent" && "font-semibold"}`}>
                Expédition
              </span>
            </div>
            <span className={`${deliveryStateNumber(props.selectedOrder.orderDeliveryState) >= 3 ? "bg-[#adabff]" : "bg-[#cbcbcb]" } w-40 h-1`}></span>
            <div className="flex relative w-8 h-8">
              <span className={`rounded-full ${deliveryStateNumber(props.selectedOrder.orderDeliveryState) >= 3 ? "border-[#5a57df] border-2 bg-[#adabff]" : "bg-[#cbcbcb]" } w-full h-full`} />
              <span className={`absolute top-[120%] text-lg text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap ${props.selectedOrder.orderDeliveryState === "in coming" && "font-semibold"}`}>
                En transit
              </span>
            </div>
            <span className={`${deliveryStateNumber(props.selectedOrder.orderDeliveryState) >= 4 ? "bg-[#adabff]" : "bg-[#cbcbcb]" } w-40 h-1`}></span>
            <div className="flex relative w-8 h-8">
              <span className={`rounded-full ${deliveryStateNumber(props.selectedOrder.orderDeliveryState) >= 4 ? "border-[#5a57df] border-2 bg-[#adabff]" : "bg-[#cbcbcb]" } w-full h-full`} />
              <span className={`absolute top-[120%] text-lg text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap ${props.selectedOrder.orderDeliveryState === "arrived" && "font-semibold"}`}>
                Livraison réussie
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
