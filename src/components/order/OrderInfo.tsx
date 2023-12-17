import { useEffect, useState } from 'react';
import { Order } from "../../interfaces/order/orders";

interface OrderInfoProps {
  selectedOrder: Order | undefined;
}

export default function OrderInfo(props: OrderInfoProps): JSX.Element {

  return (
    <>
    {props.selectedOrder && (
      <div className="flex lg:flex-row flex-col">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <img src={props.selectedOrder.orderPicture} alt="order" className="w-full h-full object-cover object-center" />
        </div>
      </div>
    )}
    </>
  )
}
