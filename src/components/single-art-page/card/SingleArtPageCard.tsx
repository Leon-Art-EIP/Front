import Button from "./Button";
import Label from "./Label";

export interface ISingleArtPageCardProps {
  description: string;
  caracteristics: string;
  price: number;
}

export default function SingleArtPageCard(props: ISingleArtPageCardProps): JSX.Element {
  return (
    <div className="p-8 w-full h-full flex flex-col rounded-2xl bg-cardBackground gap-10">
      <Label title="Description" text={props.description} />
      <Label title="Caractéristiques" text={props.caracteristics} />
      <Label title="Prix" text={`${props.price.toString()} €`} />
      <div className="flex h-full items-end justify-center">
        <div className="flex gap-8">
          <Button backgroundColor="primaryBlack" title="Faire une offre" onClick={() => {}} />
          <Button backgroundColor="primaryRed" title="Acheter" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
