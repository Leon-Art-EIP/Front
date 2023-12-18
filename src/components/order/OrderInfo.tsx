import { useEffect, useState } from "react";
import { Order } from "../../interfaces/order/orders";
import Button from "../lib/Button/Button";
import { useRouter } from "next/navigation";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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

  return (
    <>
      {props.selectedOrder && (
        <div className="flex flex-col p-10">
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
        </div>
      )}
    </>
  );
}
