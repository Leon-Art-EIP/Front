import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Order } from "../../interfaces/order/orders";

export interface OrderListProps {
  buyOrders: Order[];
  sellOrders: Order[];
  selectedOrderId: string | undefined;
  handleOrderChange: (orderId: string) => void;
  orderType: "sell" | "buy";
  handleOrderTypeChange: (orderType: "sell" | "buy") => void;
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OrderList(props: OrderListProps): JSX.Element {
  const [pendingOrdersCollapsed, setPendingOrdersCollapsed] = useState<boolean>(true);
  const [passedOrdersCollapsed, setPassedOrdersCollapsed] = useState<boolean>(true);
  const [orderToShow, setOrderToShow] = useState<Order[] | undefined>();

  useEffect(() => {
    setOrderToShow(props.buyOrders);
  }
  , [props.buyOrders]);

  function handlePendingOrdersCollapse() {
    setPendingOrdersCollapsed(!pendingOrdersCollapsed);
  }

  function handlePassedOrdersCollapse() {
    setPassedOrdersCollapsed(!passedOrdersCollapsed);
  }

  function onOrderChange(orderId: string) {
    props.handleOrderChange(orderId);
  }

  function onOrderTypeChange(orderType: "sell" | "buy") {
    props.handleOrderTypeChange(orderType);
    if (orderType === "sell") {
      setOrderToShow(props.sellOrders);
    } else {
      setOrderToShow(props.buyOrders);
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 shadow-[3px_0_3px_0px_rgba(170,170,170)] py-10 px-6 gap-6">
      <div className="flex flex-col items-center justify-between gap-4">
        <span className="text-3xl font-medium">Type de commande</span>
        <div className="flex flex-row w-full justify-around text-2xl font-medium">
          <button onClick={() => onOrderTypeChange("buy")}>
            <span className={`${props.orderType === "sell" ? "text-black" : "text-gray-600 underline underline-offset-4 decoration-[#e11c0a]"}`}>Achat</span>
          </button>
          <button onClick={() => onOrderTypeChange("sell")}>
            <span className={`${props.orderType === "buy" ? "text-black" : "text-gray-600 underline underline-offset-4 decoration-[#e11c0a]"}`}>Vente</span>
          </button>
        </div>
      </div>
      <button className="flex flex-row items-center gap-4" onClick={handlePendingOrdersCollapse}>
        <span className="text-2xl font-medium">En cours</span>
        {pendingOrdersCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      {(pendingOrdersCollapsed && orderToShow && orderToShow.length > 0) && (
        <div className="flex flex-col gap-3">
          {orderToShow.map((order, index) => (
            <>
              {order.orderState === "pending" && (
                <button
                  className={`relative overflow-hidden flex flex-row gap-4 items-center px-5 py-3 rounded-xl ${
                    order.orderId === props.selectedOrderId ? "bg-gray-200" : ""
                  } hover:bg-gray-200 hover:shadow-lg transition duration-300 ease-in-out`}
                  onClick={() => onOrderChange(order.orderId)}
                >
                  {order.orderId === props.selectedOrderId && (
                    <span className="absolute top-0 left-0 h-full w-[5px] bg-[#e11c0a]"></span>
                  )}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={`${NEXT_PUBLIC_BACKEND_URL}/api/${order.artPublicationImage}`} alt="order" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex flex-col items-start justify-between h-full">
                    <span className="text-xl font-medium">{order.artPublicationName}</span>
                    <span className="text-lg font-normal text-start line-clamp-1">{order.artPublicationDescription}</span>
                  </div>
                  <span className="text-xl font-medium">{order.orderPrice}€</span>
                </button>
              )}
            </>
          ))}
        </div>
      )}
      <button className="flex flex-row items-center gap-4" onClick={handlePassedOrdersCollapse}>
        <span className="text-2xl font-medium">Passées</span>
        {passedOrdersCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      {(passedOrdersCollapsed && orderToShow && orderToShow.length > 0) && (
        <div className="flex flex-col gap-3">
          {orderToShow.map((order, index) => (
            <>
              {order.orderState !== "pending" && (
                <button
                  className={`flex flex-row gap-4 items-center px-3 py-3 rounded-xl ${
                    order.orderId === props.selectedOrderId ? "bg-gray-200" : ""
                  } hover:bg-gray-200 hover:shadow-lg transition duration-300 ease-in-out`}
                  onClick={() => onOrderChange(order.orderId)}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={`${NEXT_PUBLIC_BACKEND_URL}/api/${order.artPublicationImage}`} alt="order" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex flex-col items-start justify-between h-full">
                    <span className="text-xl font-medium">{order.artPublicationName}</span>
                    <span className="text-lg font-normal text-start line-clamp-1">{order.artPublicationDescription}</span>
                  </div>
                  <span className="text-xl font-medium">{order.orderPrice}€</span>
                </button>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}
