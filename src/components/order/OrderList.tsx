import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useOrder } from "../../contexts/OrderContext";
import { IOrder } from "../../interfaces/order/orders";
import { cn } from "../../tools/cn";

export interface OrderListProps {
  orderType: "buy" | "sell";
  handleOrderTypeChange: (orderType: "buy" | "sell") => void;
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OrderList(props: OrderListProps): JSX.Element {
  const { buyOrders, sellOrders, selectedOrderId, handleSelectOrder } = useOrder();

  const [pendingOrdersCollapsed, setPendingOrdersCollapsed] = useState<boolean>(true);
  const [passedOrdersCollapsed, setPassedOrdersCollapsed] = useState<boolean>(true);
  const [orderToShow, setOrderToShow] = useState<IOrder[] | undefined>();

  function onOrderTypeChange(orderType: "sell" | "buy") {
    props.handleOrderTypeChange(orderType);
  }

  useEffect(() => {
    if (props.orderType === "sell") {
      setOrderToShow(sellOrders);
    } else {
      setOrderToShow(buyOrders);
    }
  }, [props.orderType, buyOrders, sellOrders]);

  function handlePendingOrdersCollapse() {
    setPendingOrdersCollapsed(!pendingOrdersCollapsed);
  }

  function handlePassedOrdersCollapse() {
    setPassedOrdersCollapsed(!passedOrdersCollapsed);
  }

  function onSelectOrder(orderId: string) {
    handleSelectOrder(orderId);
  }

  const openBuyOrdersCount = buyOrders.filter(
    (order) => order.orderState === "pending" || order.orderState === "paid" || order.orderState === "shipping"
  ).length;

  const openSellOrdersCount = sellOrders.filter(
    (order) => order.orderState === "pending" || order.orderState === "paid" || order.orderState === "shipping"
  ).length;

  return (
    <div className="text-tertiary flex flex-col h-full bg-background-hl shadow-[3px_0_3px_0px_rgba(170,170,170)] py-10 px-6 gap-6">
      <div className="flex flex-col items-center justify-between gap-4">
        <span className="text-3xl font-medium">Type de commande</span>
        <div className="flex flex-row w-full justify-around text-2xl font-medium">
          <button onClick={() => onOrderTypeChange("buy")}>
            <span
              className={`${
                props.orderType === "sell"
                  ? "text-tertiary"
                  : "text-primary underline underline-offset-4 decoration-primary"
              }`}
            >
              Achat
              <span
                className={cn(
                  "inline-flex py-1 px-3 text-xs rounded-2xl ml-2",
                  "bg-primary text-tertiary",
                  "transform translate-y-[-3px]"
                )}
              >
                {openBuyOrdersCount}
              </span>
            </span>
          </button>
          <button onClick={() => onOrderTypeChange("sell")}>
            <span
              className={`${
                props.orderType === "buy"
                  ? "text-tertiary"
                  : "text-primary underline underline-offset-4 decoration-primary"
              }`}
            >
              Vente
              <span
                className={cn(
                  "inline-flex py-1 px-3 text-xs rounded-2xl ml-2",
                  "bg-primary text-tertiary",
                  "transform translate-y-[-3px]"
                )}
              >
                {openSellOrdersCount}
              </span>
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <button className="flex flex-row items-center gap-4" onClick={handlePendingOrdersCollapse}>
          <span className="text-2xl font-medium">En cours</span>
          {!pendingOrdersCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
        {pendingOrdersCollapsed && orderToShow && orderToShow.length > 0 && (
          <div className="flex flex-col">
            {orderToShow
              .filter(
                (order) =>
                  order.orderState === "pending" || order.orderState === "paid" || order.orderState === "shipping"
              )
              .map((order) => (
                <button
                  className={`relative overflow-hidden flex flex-row gap-4 items-center px-5 py-3 rounded-xl ${
                    order.orderId === selectedOrderId ? "bg-secondary" : ""
                  } hover:bg-secondary hover:shadow-lg transition duration-300 ease-in-out`}
                  onClick={() => onSelectOrder(order.orderId)}
                  key={order.orderId}
                >
                  {order.orderId === selectedOrderId && (
                    <span className="absolute top-0 left-0 h-full w-[5px] bg-primary"></span>
                  )}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={`${NEXT_PUBLIC_BACKEND_URL}/api/${order.artPublicationImage}`}
                      alt="order"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-between h-full w-full">
                    <span className="text-xl font-medium">{order.artPublicationName}</span>
                    <span className="text-lg font-normal text-start line-clamp-1">
                      {order.artPublicationDescription}
                    </span>
                  </div>
                  <span className="text-xl font-medium">{order.orderPrice}€</span>
                </button>
              ))}
          </div>
        )}

        <button className="flex flex-row items-center gap-4 pt-6" onClick={handlePassedOrdersCollapse}>
          <span className="text-2xl font-medium">Passées</span>
          {!passedOrdersCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
        {passedOrdersCollapsed && orderToShow && orderToShow.length > 0 && (
          <div className="flex flex-col gap-3">
            {orderToShow
              .filter((order) => order.orderState === "completed" || order.orderState === "cancelled")
              .map((order) => (
                <button
                  className={`flex flex-row gap-4 items-center px-3 py-3 rounded-xl ${
                    order.orderId === selectedOrderId ? "bg-secondary" : ""
                  } hover:bg-secondary hover:shadow-lg transition duration-300 ease-in-out`}
                  onClick={() => onSelectOrder(order.orderId)}
                  key={order.orderId}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={`${NEXT_PUBLIC_BACKEND_URL}/api/${order.artPublicationImage}`}
                      alt="order"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-between h-full w-full">
                    <span className="text-tertiary text-xl font-medium">{order.artPublicationName}</span>
                    <span className="text-tertiary text-lg font-normal text-start line-clamp-1">
                      {order.artPublicationDescription}
                    </span>
                  </div>
                  <span className="text-xl font-medium">{order.orderPrice}€</span>
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
