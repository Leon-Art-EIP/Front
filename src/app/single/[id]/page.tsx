import SingleArtPage from "../../../components/single-art-page/SingleArtPage";
import Link from "../../../wrappers/link";
import fakeData from "../../../components/single-art-page/fakeData";
import SingleArtPageWrapper from "../../../wrappers/SingleArtPageWrapper";

export default async function Page(props: { params: { id: string } }) {
  const data = await Promise.resolve(fakeData); // TODO: recup la data depuis le back

  return (
    <SingleArtPageWrapper
      description={data.description}
      caracteristics={data.caracteristics}
      price={data.price}
      art={data.art}
      profile={data.profile}
      artistName={data.artistName}
      artistId={data.artistId}
      title={data.title}
      liked={data.liked}
      nbrLikes={data.nbrLikes}
      collections={data.collections}
      belongingCollections={data.belongingCollections}
      belongingCommands={data.belongingCommands}
    />
  );
}
