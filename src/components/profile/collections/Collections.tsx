"use client";

import { ChevronRight, ExpandMore, ForkRight } from "@mui/icons-material";
import IconButton from "../IconButton";
import Pictures from "../../gallery/Pictures";
import { useState } from "react";

export interface ICollectionsProps {
  collections: {
    id: number;
    title: string;
    picturesIds: number[];
  }[];
}

export default function Collections(props: ICollectionsProps): JSX.Element {
  const [openCollections, setOpenCollections] = useState<number[]>([]);

  const handleOpenCollectionsOnClick = (collectionId: number) => {
    if (openCollections.includes(collectionId)) {
      setOpenCollections(openCollections.filter((id) => id !== collectionId));
    } else {
      setOpenCollections([...openCollections, collectionId]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {props.collections.map((collection) => (
        <div className="flex flex-col gap-2">
          <div className="flex">
            <div className="font-medium text-xl">{collection.title}</div>
            <IconButton
              text=""
              icon={openCollections.includes(collection.id) ? ChevronRight : ExpandMore}
              onClick={() => handleOpenCollectionsOnClick(collection.id)}
            />
          </div>
          {openCollections.includes(collection.id) && (
            <div className="bg-secondaryGrey">
              <Pictures
                // tmp data
                pictures={[
                  "https://irisphoto.art/web/image/65508/19-98-31.jpg",
                  "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
                  "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
                  "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
                ]}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
