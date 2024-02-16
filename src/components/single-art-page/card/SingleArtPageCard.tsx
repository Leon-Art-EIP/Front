import { ElementType, useEffect, useState } from "react";
import Button from "./Button";
import Label from "./Label";
import { NotificationToast } from "../../lib";
import { myFetch } from "../../../tools/myFetch";
import FetcherDiv from "../../fetch/FetcherDiv";

export interface ISingleArtPageCardProps {
  artPublicationId: string;
  description: string;
  caracteristics: string;
  price?: number;
  link: ElementType<{ children: JSX.Element; href: string }>;
  belongingCommands: boolean;
  paymentSuccessful: boolean;
  paymentCanceled: boolean;
}

/* c8 ignore start */

export default function SingleArtPageCard({ link: Link, ...props }: ISingleArtPageCardProps): JSX.Element {
  const [notificationToast, setNotificationToast] = useState(false);
  const belongingCommands = props.belongingCommands || (notificationToast && props.paymentSuccessful);
  const [nbFetchs, setNbFetchs] = useState(0);

  const handleOk = (json: any) => {
    const data = json;

    if (data.url) {
      // Redirect to the Stripe Checkout page
      window.location.href = data.url;
    }
  };

  async function onBuyOrder() {
    setNbFetchs(nbFetchs + 1);
  }

  useEffect(() => {
    if (props.paymentSuccessful) {
      setNotificationToast(true);
    }
  }, [props.paymentSuccessful]);

  useEffect(() => {
    if (props.paymentCanceled) {
      setNotificationToast(true);
    }
  }, [props.paymentCanceled]);

  return (
    <FetcherDiv
      method="POST"
      route="/api/order/create"
      body={JSON.stringify({ artPublicationId: props.artPublicationId })}
      nbFetchs={nbFetchs}
      handleOk={handleOk}
    >
      <div className="p-8 w-full flex flex-col rounded-2xl bg-cardBackground gap-10 h-fit">
        <Label title="Description" text={props.description} />
        <Label title="Caractéristiques" text={props.caracteristics} />
        {props.price !== undefined && <Label title="Prix" text={`${props.price.toString()} €`} />}
        {props.price ? (
          <div className="flex items-end justify-center">
            <div className="flex gap-8 flex-wrap">
              <Button
                id="add-to-commands-button"
                disabled={belongingCommands}
                backgroundColor="primaryRed"
                title={"Acheter"}
                onClick={onBuyOrder}
              />
              {notificationToast && props.paymentSuccessful && (
                <NotificationToast message="Oeuvre ajoutée aux commandes" type="success" />
              )}
              {notificationToast && props.paymentCanceled && (
                <NotificationToast
                  message="Une erreur est survenue lors de l'achat de l'oeuvre, veuillez réessayer plus tard"
                  type="error"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="italic font-semibold">Cette oeuvre n&apos;est pas à vendre</div>
        )}
      </div>
    </FetcherDiv>
  );
}

/* c8 ignore stop */
