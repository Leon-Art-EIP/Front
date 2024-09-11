"use client";
/* c8 ignore start */

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { IOrder } from "../interfaces/order/orders";
import { IConnectedUser } from "../interfaces/user/user";
import { myFetch } from "../tools/myFetch";

interface OrderContextType {
  currentUser: IConnectedUser | undefined;
  buyOrders: IOrder[];
  sellOrders: IOrder[];
  selectedOrderId: string | undefined;
  selectedOrder: IOrder | undefined;
  refreshBuyOrders: () => Promise<void>;
  refreshSellOrders: () => Promise<void>;
  handleSelectOrder: (orderId: string) => void;
  fetchOrderInfos: (orderType: "buy" | "sell") => Promise<void>;
  handleGoToUserProviderProfile: (orderType: "buy" | "sell") => void;
  handleGoToChat: (orderType: "buy" | "sell") => void;
  handleConfirmReception: (orderType: "buy" | "sell") => void;
  handleCancelOrder: () => void;
  handleConfirmSend: (orderType: "buy" | "sell", rating: number) => void;
  clearSelectedOrder: () => void;
}

const defaultValue: OrderContextType = {
  currentUser: undefined,
  buyOrders: [],
  sellOrders: [],
  selectedOrderId: undefined,
  selectedOrder: undefined,
  refreshBuyOrders: async () => {},
  refreshSellOrders: async () => {},
  handleSelectOrder: () => {},
  fetchOrderInfos: async () => {},
  handleGoToUserProviderProfile: () => {},
  handleGoToChat: () => {},
  handleConfirmReception: () => {},
  handleCancelOrder: () => {},
  handleConfirmSend: () => {},
  clearSelectedOrder: () => {},
};

const OrderContext = createContext<OrderContextType>(defaultValue);

export const useOrder = () => useContext(OrderContext);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const socketRef = useRef<Socket | null>(null);

  const [currentUser, setCurrentUser] = useState<IConnectedUser>();
  const [buyOrders, setBuyOrders] = useState<IOrder[]>([]);
  const [sellOrders, setSellOrders] = useState<IOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>();
  const [selectedOrder, setSelectedOrder] = useState<IOrder | undefined>();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000");
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentUser && socketRef.current) {
      socketRef.current.emit("add-user", currentUser.user.id);

      socketRef.current.on("refresh-orders", () => {
        refreshBuyOrders();
        refreshSellOrders();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  async function refreshBuyOrders() {
    if (currentUser) {
      const res = await myFetch({ route: `/api/order/latest-buy-orders`, method: "GET" });
      if (res.ok) {
        const data = res.json;
        setBuyOrders(data);
      }
    }
  }

  async function refreshSellOrders() {
    if (currentUser) {
      const res = await myFetch({ route: `/api/order/latest-sell-orders`, method: "GET" });
      if (res.ok) {
        const data = res.json;
        setSellOrders(data);
      }
    }
  }

  async function fetchOrderInfos(orderType: "buy" | "sell") {
    const res = await myFetch({
      route: `/api/order/${orderType}/${selectedOrderId}`,
      method: "GET",
    });
    if (res.ok) {
      const data = res.json as IOrder;
      setSelectedOrder(data);
    }
  }

  function handleSelectOrder(orderId: string) {
    setSelectedOrderId(orderId);
    console.log("orderId", orderId);
  }

  function handleGoToUserProviderProfile(orderType: "buy" | "sell") {
    router.push(`/profile/${orderType === "buy" ? selectedOrder?.sellerId : selectedOrder?.buyerId}`);
  }

  async function handleGoToChat(orderType: "buy" | "sell") {
    if (currentUser && selectedOrder) {
      const res = await myFetch({
        route: `/api/conversations/create`,
        method: "PUT",
        body: JSON.stringify({
          UserOneId: orderType === "buy" ? selectedOrder.sellerId : selectedOrder.buyerId,
          UserTwoId: currentUser.user.id,
        }),
      });
      const data = res.json;
      if (res.ok) {
        router.push(`/chat/${data.convId}`);
      }
    }
  }

  async function handleConfirmReception(orderType: "buy" | "sell") {
    if (currentUser) {
      const res = await myFetch({
        route: `/api/order/confirm-shipping`,
        method: "POST",
        body: JSON.stringify({
          orderId: selectedOrderId,
        }),
      });
      if (res.ok) {
        fetchOrderInfos(orderType);
      }
    }
  }

  async function handleCancelOrder() {
    if (currentUser) {
      const res = await myFetch({
        route: `/api/order/cancel/${selectedOrderId}`,
        method: "POST",
      });
      if (res.ok) {
        router.push("/order");
      }
    }
  }

  async function handleConfirmSend(orderType: "buy" | "sell", rating: number) {
    if (currentUser) {
      const res = await myFetch({
        route: `/api/order/confirm-delivery-rate`,
        method: "POST",
        body: JSON.stringify({
          orderId: selectedOrderId,
          rating: rating,
          comment: "Super vendeur, je recommande !",
        }),
      });
      if (res.ok) {
        fetchOrderInfos(orderType);
      }
    }
  }

  function clearSelectedOrder() {
    setSelectedOrderId(undefined);
    setSelectedOrder(undefined);
  }

  return (
    <OrderContext.Provider
      value={{
        currentUser,
        buyOrders,
        sellOrders,
        selectedOrderId,
        selectedOrder,
        refreshBuyOrders,
        refreshSellOrders,
        handleSelectOrder,
        fetchOrderInfos,
        handleGoToUserProviderProfile,
        handleGoToChat,
        handleConfirmReception,
        handleCancelOrder,
        handleConfirmSend,
        clearSelectedOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
/* c8 ignore stop */
