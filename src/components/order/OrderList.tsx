import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Order, Orders } from "../../interfaces/order/orders";

export interface OrderListProps {
  orders: Orders;
  selectedOrder: Order | undefined;
  handleOrderChange: (order: Order) => void;
}

export default function OrderList(props: OrderListProps): JSX.Element {
  const [pendingOrdersCollapsed, setPendingOrdersCollapsed] = useState<boolean>(true);
  const [passedOrdersCollapsed, setPassedOrdersCollapsed] = useState<boolean>(true);

  function handlePendingOrdersCollapse() {
    setPendingOrdersCollapsed(!pendingOrdersCollapsed);
  }

  function handlePassedOrdersCollapse() {
    setPassedOrdersCollapsed(!passedOrdersCollapsed);
  }

  function onOrderChange(order: Order) {
    props.handleOrderChange(order);
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 shadow-[3px_0_3px_0px_rgba(170,170,170)] py-10 px-6 gap-6">
      <button className="flex flex-row items-center gap-4" onClick={handlePendingOrdersCollapse}>
        <span className="text-2xl font-medium">En cours</span>
        {pendingOrdersCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      {pendingOrdersCollapsed && (
        <div className="flex flex-col gap-3">
          {props.orders.orders.map((order, index) => (
            <>
              {order.orderState === "pending" && (
                <button
                  className={`relative overflow-hidden flex flex-row gap-4 items-center px-5 py-3 rounded-xl ${
                    order.orderId === props.selectedOrder?.orderId ? "bg-gray-200" : ""
                  } hover:bg-gray-200 hover:shadow-lg transition duration-300 ease-in-out`}
                  onClick={() => onOrderChange(order)}
                >
                  {order.orderId === props.selectedOrder?.orderId && <span className="absolute top-0 left-0 h-full w-[5px] bg-[#e11c0a]"></span>}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={order.orderPicture} alt="order" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex flex-col items-start justify-between h-full">
                    <span className="text-xl font-medium">{order.orderTitle}</span>
                    <span className="text-lg font-normal text-start line-clamp-1">{order.orderDescription}</span>
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
      {passedOrdersCollapsed && (
        <div className="flex flex-col gap-3">
          {props.orders.orders.map((order, index) => (
            <>
              {order.orderState !== "pending" && (
                <button
                  className={`flex flex-row gap-4 items-center px-3 py-3 rounded-xl ${
                    order.orderId === props.selectedOrder?.orderId ? "bg-gray-200" : ""
                  } hover:bg-gray-200 hover:shadow-lg transition duration-300 ease-in-out`}
                  onClick={() => onOrderChange(order)}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={order.orderPicture} alt="order" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex flex-col items-start justify-between h-full">
                    <span className="text-xl font-medium">{order.orderTitle}</span>
                    <span className="text-lg font-normal text-start line-clamp-1">{order.orderDescription}</span>
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
