"use client";

import { useEffect, useState, useRef } from "react";
import OrderList from "../../components/order/OrderList";
import OrderInfo from "../../components/order/OrderInfo";
import { Order, Orders } from "../../interfaces/order/orders";
import Modal from "../../components/lib/Modal/Modal";
import { orderDeliveryHelpText } from "../../configs/order/orderDeliveryHelp";
import CloseIcon from '@mui/icons-material/Close';

export default function OrderWrapper(): JSX.Element {
  const [orders, setOrders] = useState<Orders>({ orders: [] });
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  const [deliveryHelpModal, setDeliveryHelpModal] = useState<boolean>(false);

  // to be removed for the end of Sprint 3
  function populateOrders() {
    const order1: Order = {
      orderDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl.",
      orderTitle: "Le vent des tempètes",
      orderId: "test123idordzzzzer",
      orderPicture:
        "https://static1.mclcm.net/iod/images/v2/69/photo/309138/1280x720_100_300_000000x30x0.jpg?ts=20190507121514",
      orderPrice: 20,
      orderRating: 4,
      orderState: "pending",
      orderDeliveryState: "preparation",
      orderUserProviderName: "Pipou papy",
      orderUserProviderId: "nezuineuzanuezauibezabiezabieza",
    };
    const order2: Order = {
      orderDescription:
        "Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl.",
      orderTitle: "Le chien et la tourterelle",
      orderId: "test123ezaeazidordeeeer",
      orderPicture: "https://upload.chien.com/upload_global/61/75077-88349_light.jpg",
      orderPrice: 40,
      orderRating: 2,
      orderState: "pending",
      orderDeliveryState: "sent",
      orderUserProviderName: "Pokemon Pickachumaster",
      orderUserProviderId: "nezuineuzanuezauibezabiezabieza",
    };
    const order3: Order = {
      orderDescription:
        "Donec eui ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl.",
      orderTitle: "Au mille fourneaux",
      orderId: "test123ezaeazidoezaeazezaezaezardeeazeazr",
      orderPicture: "https://s7.decofinder.com/0/0/vig-mos/vig/584/584157/Fourneau.jpg",
      orderPrice: 200,
      orderRating: 4,
      orderState: "pending",
      orderDeliveryState: "in coming",
      orderUserProviderName: "Mathias legrand",
      orderUserProviderId: "nezuineuzanuezauibezabiezabieza",
    };
    const order4: Order = {
      orderDescription:
        "Donec eui ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl.",
      orderTitle: "Au mille fourneaux2",
      orderId: "test123ezaeaziezaeazezaeazdordeeazeazr",
      orderPicture: "https://s7.decofinder.com/0/0/vig-mos/vig/584/584157/Fourneau.jpg",
      orderPrice: 2100,
      orderRating: 4,
      orderState: "accepted",
      orderDeliveryState: "arrived",
      orderUserProviderName: "Frederick tototito",
      orderUserProviderId: "nezuineuzanuezauibezabiezabieza",
    };
    const order5: Order = {
      orderDescription:
        "Donec eui ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl ultrices nisl, nec ultricies nisl nisl eget nisl.",
      orderTitle: "Au mille fourneaux3",
      orderId: "test123ezaeaezaeazzidordeeazeazr",
      orderPicture: "https://s7.decofinder.com/0/0/vig-mos/vig/584/584157/Fourneau.jpg",
      orderPrice: 1100,
      orderRating: 2,
      orderState: "accepted",
      orderDeliveryState: "sent",
      orderUserProviderName: "Elder Ringmaster",
      orderUserProviderId: "nezuineuzanuezauibezabiezabieza",
    };
    setOrders({ orders: [order1, order2, order3, order4, order5] });
    setSelectedOrder(order1);
  }

  useEffect(() => {
    populateOrders();
  }, []);

  function handleOrderChange(order: Order) {
    setSelectedOrder(order);
  }

  function handleToggleDeliveryHelpModal() {
    setDeliveryHelpModal(!deliveryHelpModal);
  }

  return (
    <div className="flex flex-row page-content-non-scrollable">
      <div className="lg:w-1/3 lg:min-w-[350px] lg:max-w-[450px] flex-shrink-0">
        <OrderList orders={orders} selectedOrder={selectedOrder} handleOrderChange={handleOrderChange} />
      </div>
      <OrderInfo
        selectedOrder={selectedOrder}
        deliveryHelpModal={deliveryHelpModal}
        openDeliveryHelpModal={handleToggleDeliveryHelpModal}
      />
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
