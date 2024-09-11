"use client";

import CloseIcon from "@mui/icons-material/Close";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../../components/lib/Modal/Modal";
import OrderInfo from "../../components/order/OrderInfo";
import OrderList from "../../components/order/OrderList";
import { orderDeliveryHelpText } from "../../configs/order/orderDeliveryHelp";
import { useOrder } from "../../contexts/OrderContext";

export default function OrderWrapper(): JSX.Element {
  const {
    currentUser,
    selectedOrderId,
    refreshBuyOrders,
    refreshSellOrders,
    handleSelectOrder,
    clearSelectedOrder,
    buyOrders,
    sellOrders,
  } = useOrder();

  const searchParams = useSearchParams();

  const [orderType, setOrderType] = useState<"buy" | "sell">(getInitialOrderType());
  const orderIdSelectedParams = searchParams.get("orderId") || undefined;
  const [deliveryHelpModal, setDeliveryHelpModal] = useState<boolean>(false);

  function getInitialOrderType(): "buy" | "sell" {
    const type = searchParams.get("type");
    if (type === "sell" || (type !== "buy" && !buyOrders.length)) {
      return "sell";
    }
    return "buy";
  }

  useEffect(() => {
    if (orderIdSelectedParams) {
      handleSelectOrder(orderIdSelectedParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderIdSelectedParams]);

  useEffect(() => {
    const newOrderType = getInitialOrderType();
    if (newOrderType !== orderType) {
      setOrderType(newOrderType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, buyOrders, sellOrders]);

  useEffect(() => {
    if (currentUser) {
      refreshBuyOrders();
      refreshSellOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  function handleOrderTypeChange(orderType: "buy" | "sell") {
    clearSelectedOrder();
    setOrderType(orderType);
  }

  function handleToggleDeliveryHelpModal() {
    setDeliveryHelpModal(!deliveryHelpModal);
  }

  return (
    <div className="bg-background flex flex-row page-content-non-scrollable">
      <div className="w-1/3 min-w-[350px] max-w-[500px] flex-shrink-0">
        <OrderList orderType={orderType} handleOrderTypeChange={handleOrderTypeChange} />
      </div>
      {orderIdSelectedParams === undefined && selectedOrderId === undefined ? (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-gray-400">
          <LocalGroceryStoreIcon sx={{ fontSize: 200 }} />
          <span className="text-2xl font-bold">Bienvenue sur votre espace d{"'"}achat et vente</span>
          <div className="flex flex-col w-1/3 text-center gap-6">
            <span className="text-xl font-medium">
              Ici vous pouvez retrouver toutes vos commandes en cours, ainsi que vos commandes passées
            </span>
            <span className="text-xl font-medium">
              Pour en créer une commande, il vous suffit simplement d{"'"}ajouter au panier une oeuvre d{"'"}art et vous
              pourrez la retrouver ici.
            </span>
          </div>
        </div>
      ) : (
        <OrderInfo
          orderType={orderType}
          deliveryHelpModal={deliveryHelpModal}
          openDeliveryHelpModal={handleToggleDeliveryHelpModal}
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
