import type { Meta, StoryObj } from "@storybook/react";
import Collections, { ICollectionsProps } from "./Collections";

export default {
  title: "Components/Profile/Collections",
  component: Collections,
} as Meta<typeof Collections>;

type Story = StoryObj<ICollectionsProps>;

const pictures = [
  "https://irisphoto.art/web/image/65508/19-98-31.jpg",
  "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
  "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
  "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
];

export const Regular: Story = {
  args: {
    collections: [
      {
        id: "1",
        title: "Collection 1",
        pictures: pictures.map((picture, index) => ({
          id: `${index}`,
          src: picture,
        })),
      },
      {
        id: "2",
        title: "Collection 2",
        pictures: pictures.map((picture, index) => ({
          id: `${index}`,
          src: picture,
        })),
      },
    ],
  },
};
