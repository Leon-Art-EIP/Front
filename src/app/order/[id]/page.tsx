import { param } from "cypress/types/jquery";
import OrderWrapper from "../../../wrappers/order/OrderWrapper";

export default function Page(props: { params: { id: string } }): JSX.Element {
  return <OrderWrapper orderId={props.params.id}/>;
}
