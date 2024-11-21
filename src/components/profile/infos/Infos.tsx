import { Close, DeleteOutline } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { ElementType, useState } from "react";
import { IUser } from "../../../interfaces/user/user";
import { myFetch } from "../../../tools/myFetch";
import AvailableForCommandsButton from "../../../wrappers/profile/AvailableForCommandsButton";
import InfosButtonsWrapper from "../../../wrappers/profile/InfosButtonsWrapper";
import LinkButton from "../../lib/Button/LinkButton";
import { FollowerCard } from "./FollowerCard";
import { Star } from "@mui/icons-material";
import SocialMediaLinks from "../../../wrappers/profile/SocialMediaLinks";
import ShareLocalisation from "../../localisation/ShareLocalisation";

export interface IInfosProps {
  availability: "available" | "unavailable";
  artistName: string;
  numberOfFollowers: number;
  followers: IUser[];
  followed: IUser[];
  averageRating: number;
  numberOfPosts: number;
  myProfile: boolean;
  following: boolean;
  id: string;
  connectedUserId: string;
  link: ElementType<{ children: JSX.Element; href: string }>;
  socialMediaLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
}

export default function Infos(props: IInfosProps): JSX.Element {
  const [tabIndex, setTabIndex] = useState(0);
  const [following, setFollowing] = useState<boolean>(props.following);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const numberOfFollowers =
    props.numberOfFollowers + (!props.following && following ? 1 : 0) - (props.following && !following ? 1 : 0);
  const kfollowers =
    numberOfFollowers > 1000
      ? numberOfFollowers > 1000000
        ? `${Math.floor(numberOfFollowers / 100000) / 10}M`
        : `${Math.floor(numberOfFollowers / 100) / 10}k`
      : numberOfFollowers;

  const openFollowerModal = () => {
    setIsFollowerModalOpen(true);
  };

  const closeFollowerModal = () => {
    setIsFollowerModalOpen(false);
  };

  const handleUnfollow = (id: string) => {
    // <Fetcher route={`/api/follow/${props.id}`} method="POST" nbFetchs={2} />;
    const response = myFetch({ route: `/api/follow/${id}`, method: "POST" });
    console.log("Unfollow : " + `/api/follow/${id}`);
    console.log("ID : " + id);
    console.log(props.followed);
    console.log(props.followers);
    setIsFollowerModalOpen(false);
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-background-hl pt-4 w-72 mx-16">
      <div className="p-4 inline-flex flex-col gap-3 justify-center">
        <div className="font-medium text-2xl text-center text-tertiary">{props.artistName}</div>
        <div className="in line-flex justify-center">
          {/* <div className="bg-secondary rounded-2xl font-semibold px-4 py-1 text-sm text-center text-tertiary">
            {props.artType}
          </div> */}
        </div>
        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="font-medium text-xl text-tertiary">{kfollowers}</div>
            {props.myProfile && (
              <button onClick={openFollowerModal} className="text-tertiary focus:outline-none">
                {`Follower${numberOfFollowers > 1 ? "s" : ""}`}
              </button>
            )}
            {!props.myProfile && <div>{`Follower${numberOfFollowers > 1 ? "s" : ""}`}</div>}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="font-medium text-xl text-tertiary">{props.numberOfPosts}</div>
            <div className="text-tertiary">Posts</div>
          </div>
          {props.averageRating > 0 && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1 font-medium text-xl text-tertiary">
                {props.averageRating}
                <Star></Star>
              </div>
              <div className="text-tertiary">Note</div>
            </div>
          )}
        </div>

        {!props.myProfile && (
          <InfosButtonsWrapper
            following={following}
            link={props.link}
            id={props.id}
            connectedUserId={props.connectedUserId}
            setFollowing={setFollowing}
          />
        )}
        <AvailableForCommandsButton isAvailable={props.availability === "available"} disabled={!props.myProfile} />
        <SocialMediaLinks socialMediaLinks={props.socialMediaLinks} />
        {props.myProfile && (
          <>
            <div className="h-0.5 w-full bg-gray-400 rounded" />
            <LinkButton
              link={props.link}
              href={`/single/new`}
              color="danger"
              type="button"
              className="w-fit self-center"
            >
              Nouvelle publication
            </LinkButton>
            {props.numberOfPosts > 0 ? (
              <ShareLocalisation color="secondary" />
            ) : (
              <p className="text-center">
                Créez au moins une publication si vous souhaitez partager votre localisation
              </p>
            )}
          </>
        )}
        {isFollowerModalOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center h-full">
              {" "}
              {/* Définissez la hauteur de la modal */}
              <div
                className="bg-secondary rounded-lg shadow-lg p-6 max-w-sm mx-auto relative text-tertiary"
                style={{ width: "400px" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="absolute top-1 right-1 cursor-pointer" onClick={closeFollowerModal}>
                    <Close style={{ fontSize: 24, color: "tertiary" }} />
                  </div>
                </div>
                <div className="w-full h-px bg-tertiary my-2" />
                <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)}>
                  <Tab label="Followers" />
                  <Tab label="Suivis" />
                </Tabs>
                {tabIndex === 0 && (
                  <div className="flex flex-col gap-2">
                    {/* <div> {props.followers.length} </div> */}
                    {props.followers.map((subscriber, index) => (
                      <FollowerCard key={index} id={subscriber.id} name={subscriber.username} index={index} />
                    ))}
                  </div>
                )}
                {tabIndex === 1 && (
                  <div className="flex flex-col gap-2">
                    {props.followed.map((subscribed, index) => (
                      <div key={index} className="flex-col gap-2">
                        <div className="flex justify items-center">
                          <div className="flex" style={{ minWidth: "200px" }}>
                            <FollowerCard key={index} id={subscribed.id} name={subscribed.username} index={index} />
                          </div>
                          <button
                            className="bg-primary text-secondary px-2 py-1 rounded-full ml-auto"
                            onClick={() => handleUnfollow(subscribed.id)}
                          >
                            <DeleteOutline className="" style={{ marginTop: "-3px" }} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
