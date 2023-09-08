"use client";

import SingleArtPage from "../components/single-art-page/SingleArtPage";
import { ISingleArtPageProps } from "../components/single-art-page/SingleArtPage";
import Link from "./link";

export interface ISingleArtPageWrapperProps extends Omit<ISingleArtPageProps, "link"> {}

export default function SingleArtPageWrapper(props: ISingleArtPageWrapperProps): JSX.Element {
  return (
    <SingleArtPage
      artistName={props.artistName}
      artistId={props.artistId}
      description={props.description}
      caracteristics={props.caracteristics}
      price={props.price}
      art={props.art}
      profile={props.profile}
      title={props.title}
      liked={props.liked}
      nbrLikes={props.nbrLikes}
      collections={props.collections}
      belongingCollections={props.belongingCollections}
      belongingCommands={props.belongingCommands}
      link={Link}
    />
  );
}
