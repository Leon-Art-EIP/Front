"use client";

import { useEffect, useState, useRef } from "react";
import OrderList from "../../components/order/OrderList";
import OrderInfo from "../../components/order/OrderInfo";
import { Order } from "../../interfaces/order/orders";
import Modal from "../../components/lib/Modal/Modal";
import { orderDeliveryHelpText } from "../../configs/order/orderDeliveryHelp";
import CloseIcon from "@mui/icons-material/Close";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { myFetch } from "../../tools/myFetch";
import { IConnectedUser } from "../../interfaces/user/user";
import { useRouter } from "next/navigation";

interface OrderWrapperProps {
  orderId: string | undefined;
}

export default function OrderWrapper(props: OrderWrapperProps): JSX.Element {
  const router = useRouter();
  const [orderType, setOrderType] = useState<"sell" | "buy">("buy");
  const [buyOrders, setBuyOrders] = useState<Order[]>([]);
  const [sellOrders, setSellOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>();
  const [currentUser, setCurrentUser] = useState<IConnectedUser>();

  const [deliveryHelpModal, setDeliveryHelpModal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBuyOrders() {
      const res = await myFetch({ route: `/api/order/latest-buy-orders`, method: "GET" });
      const data: Order[] = await res.json();
      setBuyOrders(data);
    }
    async function fetchSellOrders() {
      const res = await myFetch({ route: `/api/order/latest-sell-orders`, method: "GET" });
      const data: Order[] = await res.json();
      setSellOrders(data);
    }
    async function getCurrentUser() {
      if (!localStorage.getItem("user")) {
        router.push("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user") || "{}"));
      }
    }
    
    getCurrentUser();
    fetchBuyOrders();
    fetchSellOrders();
  }, []);

  function handleOrderChange(orderId: string) {
    setSelectedOrderId(orderId);
  }

  function handleToggleDeliveryHelpModal() {
    setDeliveryHelpModal(!deliveryHelpModal);
  }

  function handleOrderTypeChange(type: "sell" | "buy") {
    setOrderType(type);
  }

  return (
    <div className="flex flex-row page-content-non-scrollable">
      <div className="w-1/3 min-w-[350px] max-w-[500px] flex-shrink-0">
        <OrderList
          buyOrders={buyOrders}
          sellOrders={sellOrders}
          selectedOrderId={selectedOrderId}
          handleOrderChange={handleOrderChange}
          orderType={orderType}
          handleOrderTypeChange={handleOrderTypeChange}
        />
      </div>
      {props.orderId === undefined && selectedOrderId === undefined ? (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-gray-400">
          <LocalGroceryStoreIcon sx={{ fontSize: 200 }} />
          <span className="text-2xl font-bold">Bienvenue sur votre espace d'achat et vente</span>
          <div className="flex flex-col w-1/3 text-center gap-6">
            <span className="text-xl font-medium">
              Ici vous pouvez retrouver toutes vos commandes en cours, ainsi que vos commandes passées
            </span>
            <span className="text-xl font-medium">
              Pour en créer une commande, il vous suffit simplement d'ajouter au panier une oeuvre d'art et vous pourrez
              la retrouver ici.
            </span>
          </div>
        </div>
      ) : (
        <OrderInfo
          selectedOrderId={selectedOrderId}
          orderType={orderType}
          deliveryHelpModal={deliveryHelpModal}
          openDeliveryHelpModal={handleToggleDeliveryHelpModal}
          currentUser={currentUser}
        />
      )}
      {deliveryHelpModal && (
        <Modal handleClose={handleToggleDeliveryHelpModal} isOpen={deliveryHelpModal}>
          <div className="flex flex-col justify-start gap-5">
            <div className="flex flex-row justify-between">
              <span className="text-2xl underline">A propos des livraisons</span>
              <button onClick={handleToggleDeliveryHelpModal}>
                <CloseIcon />
              </button>
            </div>
            <span className="text-lg w-[500px]">{orderDeliveryHelpText}</span>
          </div>
        </Modal>
      )}
    </div>
  );
}
