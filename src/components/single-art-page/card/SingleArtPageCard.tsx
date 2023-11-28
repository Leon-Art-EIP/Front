import { ElementType, useState } from "react";
import Button from "./Button";
import Label from "./Label";
import { NotificationToast } from "../../lib";

export interface ISingleArtPageCardProps {
  description: string;
  caracteristics: string;
  price: number;
  link: ElementType<{ children: JSX.Element; href: string }>;
  belongingCommands: boolean;
}

export default function SingleArtPageCard({ link: Link, ...props }: ISingleArtPageCardProps): JSX.Element {
  const [notificationToast, setNotificationToast] = useState(false);
  const belongingCommands = props.belongingCommands || notificationToast;

  return (
    <div className="p-8 w-full h-full flex flex-col rounded-2xl bg-cardBackground gap-10">
      <Label title="Description" text={props.description} />
      <Label title="Caractéristiques" text={props.caracteristics} />
      <Label title="Prix" text={`${props.price.toString()} €`} />
      <div className="flex h-full items-end justify-center">
        <div className="flex gap-8 flex-wrap">
          <Link href="/purchase">
            <Button backgroundColor="primaryBlack" title="Faire une offre" />
          </Link>
          {/* c8 ignore start */}
          <Button
            id="add-to-commands-button"
            disabled={belongingCommands}
            backgroundColor="primaryRed"
            title={(belongingCommands ? "Ajouté" : "Ajouter") + " aux commandes"}
            onClick={() => {
              setNotificationToast(true);
            }}
          />
          {/* c8 ignore stop */}
          {notificationToast && <NotificationToast message="Oeuvre ajoutée aux commandes" type="success" />}
        </div>
      </div>
    </div>
  );
}
