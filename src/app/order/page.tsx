import { OrderProvider } from "../../contexts/OrderContext";
import OrderWrapper from "../../wrappers/order/OrderWrapper";

export default function Page(): JSX.Element {
  return (
    <OrderProvider>
      <OrderWrapper />
    </OrderProvider>
  );
}
