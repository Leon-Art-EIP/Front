import { Close } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { ElementType, useState } from "react";
import { IInfoUser } from "../../../interfaces/user/user";
import AvailableForCommandsButton from "../../../wrappers/profile/AvailableForCommandsButton";
import InfosButtonsWrapper from "../../../wrappers/profile/InfosButtonsWrapper";
import LinkButton from "../../lib/Button/LinkButton";
import Category, { TCategory } from "../category/Category";
import { FollowerCard } from "./FollowerCard";

export interface IInfosProps {
  availability: "available" | "unavailable";
  artistName: string;
  artType: string;
  numberOfFollowers: number;
  followers: IInfoUser[];
  followed: IInfoUser[];
  numberOfPosts: number;
  categories: TCategory[];
  myProfile: boolean;
  following: boolean;
  id: string;
  connectedUserId: string;
  link: ElementType<{ children: JSX.Element; href: string }>;
}

/* c8 ignore start */

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
    // console.log(`followed: ${props.followed}`);
  };

  const closeFollowerModal = () => {
    setIsFollowerModalOpen(false);
  };

  return (
    <div className="flex items-start w-3/4 h-full bg-gradient-to-b from-background-hl">
      <div className="p-4 inline-flex flex-col gap-3 justify-center">
        <div className="font-medium text-2xl text-center text-tertiary">{props.artistName}</div>
        <div className="inline-flex justify-center">
          <div className="bg-secondary rounded-2xl font-semibold px-4 py-1 text-sm text-center text-tertiary">
            {props.artType}
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="font-medium text-xl text-tertiary">{kfollowers}</div>
            {props.myProfile && (
              <button onClick={openFollowerModal} className="text-tertiary focus:outline-none">
                {`follower${numberOfFollowers > 1 ? "s" : ""}`}
              </button>
            )}
            {!props.myProfile && <div>{`follower${numberOfFollowers > 1 ? "s" : ""}`}</div>}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="font-medium text-xl text-tertiary">{props.numberOfPosts}</div>
            <div className="text-tertiary">posts</div>
          </div>
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
        <div className="h-0.5 w-full bg-black" />
        <div className="flex flex-wrap justify-center gap-2">
          {props.categories.map((category) => (
            <Category category={category} key={`buttonCategory-${category}`} />
          ))}
        </div>
        {props.myProfile && (
          <LinkButton link={props.link} href={`/single/new`} color="danger" type="button" className="w-fit self-center">
            Nouvelle publication
          </LinkButton>
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
                {/* <div className="w-full h-px bg-tertiary my-2" /> */}
                <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)}>
                  <Tab label="Followers" />
                  <Tab label="Suivis" />
                </Tabs>
                {tabIndex === 0 && (
                  <div className="flex flex-col gap-2">
                    {props.followers.subscribers.map((subscriber, index) => (
                      <FollowerCard key={index} id={subscriber._id} name={subscriber.username} index={index} />
                    ))}
                  </div>
                )}
                {tabIndex === 1 && (
                  <div>
                    {props.followed.subscriptions.map((subscriber, index) => (
                      <FollowerCard key={index} id={subscriber._id} name={subscriber.username} index={index} />
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

/* c8 ignore stop */
