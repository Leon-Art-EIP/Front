import { Order } from "../../interfaces/order/orders";
import Button from "../lib/Button/Button";
import { useRouter } from "next/navigation";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useEffect, useState } from "react";
import { myFetch } from "../../tools/myFetch";

interface OrderInfoProps {
  selectedOrderId: string | undefined;
  orderType: "sell" | "buy";
  deliveryHelpModal: boolean;
  openDeliveryHelpModal: () => void;
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OrderInfo(props: OrderInfoProps): JSX.Element {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  useEffect(() => {
    async function fetchOrderInfos() {
      const res = await myFetch({
        route: `/api/order/${props.orderType === "buy" ? "buy" : "sell"}/${props.selectedOrderId}`,
        method: "GET",
      });
      const data: Order = await res.json();
      console.log(data);
      setSelectedOrder(data);
    }

    fetchOrderInfos();
  }, [props.selectedOrderId]);

  function onGoToUserProviderProfile() {
    router.push(`/profile/${props.orderType === "buy" ? selectedOrder?.sellerId : selectedOrder?.buyerId}`);
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
      {selectedOrder && (
        <div className="flex flex-col p-10 h-full overflow-auto">
          <div className="flex xl:flex-row flex-col gap-10">
            <div className="relative flex flex-col gap-4 max-w-2xl h-fit max-h-[450px] flex-shrink-0">
              <img
                src={`${NEXT_PUBLIC_BACKEND_URL}/api/${selectedOrder.artPublicationImage}`}
                alt="order"
                className="w-full h-full max-h-[450px] object-cover object-center rounded-xl"
              />
              <Button color="primary" type="button" onClick={onGoToChat} className="absolute top-[105%] w-full">
                Aller à la conversation
              </Button>
            </div>
            <div className="flex flex-col justify-start items-start gap-12 xl:pt-0 pt-8">
              <span className="text-2xl font-semibold">{selectedOrder.artPublicationName}</span>
              <span className="text-lg line-clamp-5">{selectedOrder.artPublicationDescription}</span>
              <div className="flex flex-row w-full justify-between">
                <button onClick={onGoToUserProviderProfile}>
                  <span className="text-xl">
                    {props.orderType === "buy" ? selectedOrder.sellerName : selectedOrder.buyerName}
                  </span>
                </button>
                <span className="text-xl">{selectedOrder.orderPrice}€</span>
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
              <span
                className={`rounded-full ${
                  deliveryStateNumber(selectedOrder.orderState) >= 1
                    ? "border-[#5a57df] border-2 bg-[#adabff]"
                    : "bg-[#cbcbcb]"
                } w-full h-full`}
              />
              <span
                className={`absolute top-[120%] text-lg text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
                  selectedOrder.orderState === "preparation" && "font-semibold"
                }`}
              >
                Préparation de la
                <br /> commande
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
                  selectedOrder.orderState === "sent" && "font-semibold"
                }`}
              >
                Expédition
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
                  selectedOrder.orderState === "in coming" && "font-semibold"
                }`}
              >
                En transit
              </span>
            </div>
            <span
              className={`${
                deliveryStateNumber(selectedOrder.orderState) >= 4 ? "bg-[#adabff]" : "bg-[#cbcbcb]"
              } w-40 h-1`}
            ></span>
            <div className="flex relative w-8 h-8">
              <span
                className={`rounded-full ${
                  deliveryStateNumber(selectedOrder.orderState) >= 4
                    ? "border-[#5a57df] border-2 bg-[#adabff]"
                    : "bg-[#cbcbcb]"
                } w-full h-full`}
              />
              <span
                className={`absolute top-[120%] text-lg text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
                  selectedOrder.orderState === "arrived" && "font-semibold"
                }`}
              >
                Livraison réussie
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
