"use client";

import { useEffect, useState, useRef } from "react";
import OrderList from "../../components/order/OrderList";
import OrderInfo from "../../components/order/OrderInfo";
import { Order, Orders } from "../../interfaces/order/orders";

export default function OrderWrapper(): JSX.Element {
  const [orders, setOrders] = useState<Orders>({ orders: [] });
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  // to be removed for the end of Sprint 3
  function populateOrders () {
    const order1: Order = {
      orderDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl.",
      orderTitle: "Le vent des tempètes",
      orderId: "test123idorder",
      orderPicture: "https://static1.mclcm.net/iod/images/v2/69/photo/309138/1280x720_100_300_000000x30x0.jpg?ts=20190507121514",
      orderPrice: 20,
      orderRating: 4,
      orderState: "pending",
      orderDeliveryState: "preparation",
      selected: true,
    }
    const order2: Order = {
      orderDescription: "Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl.",
      orderTitle: "Le chien et la tourterelle",
      orderId: "test123ezaeazidorder",
      orderPicture: "https://upload.chien.com/upload_global/61/75077-88349_light.jpg",
      orderPrice: 40,
      orderRating: 2,
      orderState: "pending",
      orderDeliveryState: "preparation",
      selected: false,
    }
    const order3: Order = {
      orderDescription: "Donec eui ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl.",
      orderTitle: "Au mille fourneaux",
      orderId: "test123ezaeazidordeeazeazr",
      orderPicture: "https://s7.decofinder.com/0/0/vig-mos/vig/584/584157/Fourneau.jpg",
      orderPrice: 200,
      orderRating: 4,
      orderState: "pending",
      orderDeliveryState: "preparation",
      selected: false,
    }
    const order4: Order = {
      orderDescription: "Donec eui ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl.",
      orderTitle: "Au mille fourneaux2",
      orderId: "test123ezaeazidordeeazeazr",
      orderPicture: "https://s7.decofinder.com/0/0/vig-mos/vig/584/584157/Fourneau.jpg",
      orderPrice: 2100,
      orderRating: 4,
      orderState: "accepted",
      orderDeliveryState: "preparation",
      selected: false,
    }
    const order5: Order = {
      orderDescription: "Donec eui ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl.",
      orderTitle: "Au mille fourneaux3",
      orderId: "test123ezaeazidordeeazeazr",
      orderPicture: "https://s7.decofinder.com/0/0/vig-mos/vig/584/584157/Fourneau.jpg",
      orderPrice: 1100,
      orderRating: 2,
      orderState: "accepted",
      orderDeliveryState: "preparation",
      selected: false,
    }
    setOrders({ orders: [order1, order2, order3, order4, order5] });
  }

  useEffect(() => {
    populateOrders();
  }, []);

  function handleOrderChange(order: Order) {
    
  }

  return (
    <div className="flex flex-row page-content-non-scrollable">
      <div className="lg:w-1/3 lg:min-w-[350px] lg:max-w-[450px]">
        <OrderList orders={orders} handleOrderChange={handleOrderChange} />
      </div>
      <OrderInfo selectedOrder={selectedOrder} />
    </div>
  );
}
