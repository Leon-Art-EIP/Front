import { ElementType, useEffect, useState } from "react";
import Button from "./Button";
import Label from "./Label";
import { NotificationToast } from "../../lib";
import { myFetch } from "../../../tools/myFetch";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "put the public key in the .env file!");

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

export default function SingleArtPageCard({ link: Link, ...props }: ISingleArtPageCardProps): JSX.Element {
  const [notificationToast, setNotificationToast] = useState(false);
  const belongingCommands = props.belongingCommands || notificationToast && props.paymentSuccessful;

  async function onBuyOrder() {
    const response = await myFetch({
      route: `/api/order/create`,
      method: "POST",
      body: JSON.stringify({ artPublicationId: props.artPublicationId }),
    });
    const data = await response.json();

    if (data.url) {
      // Redirect to the Stripe Checkout page
      window.location.href = data.url;
    } else {
      console.log("Failed to initiate payment process.");
    }
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
            {(notificationToast && props.paymentSuccessful) && <NotificationToast message="Oeuvre ajoutée aux commandes" type="success" />}
            {(notificationToast && props.paymentCanceled) && <NotificationToast message="Une erreur est survenue lors de l'achat de l'oeuvre, veuillez réessayer plus tard" type="error" />}
          </div>
        </div>
      ) : (
        <div className="italic font-semibold">Cette oeuvre n&apos;est pas à vendre</div>
      )}
    </div>
  );
}
