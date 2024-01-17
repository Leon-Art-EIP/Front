import { IArtist } from "../../../interfaces/home/artist";
import image1 from "../../../assets/profile1.jpeg";
import image2 from "../../../assets/profilePicture.png";
import image3 from "../../../assets/image15.jpg";
import image4 from "../../../assets/image16.jpg";
import image5 from "../../../assets/image17.jpg";
import image6 from "../../../assets/image18.jpg";

const defaultArtist: IArtist = {
  _id: "6591810b5243d36ad5d0d1c8",
  username: "JohnC",
  email: "johncena@wwe.com",
  is_artist: true,
  availability: "unavailable",
  subscription: "standard",
  collections: [],
  subscriptions: [],
  subscribers: [],
  subscribersCount: 0,
  likedPublications: [],
  canPostArticles: true,
  profilePicture: "uploads/static/default-profile-pic.png",
  bannerPicture: "uploads/static/default-banner-pic.png",
};

export const artists: IArtist[] = [
  {
    ...defaultArtist,
    _id: "1",
    username: "Lou Reed",
    profilePicture: image1,
  },
  {
    ...defaultArtist,
    _id: "2",
    username: "Jennifer Hanson",
    profilePicture: image2,
  },
  {
    ...defaultArtist,
    _id: "3",
    username: "Leo Messi",
    profilePicture: image3,
  },
  {
    ...defaultArtist,
    _id: "4",
    username: "Cristiano Ronaldo",
    profilePicture: image4,
  },
  {
    ...defaultArtist,
    _id: "5",
    username: "Neymar Jr",
    profilePicture: image5,
  },
  {
    ...defaultArtist,
    _id: "6",
    username: "Kylian Mbappé",
    profilePicture: image6,
  },
  {
    ...defaultArtist,
    _id: "7",
    username: "Lou Reed",
    profilePicture: image1,
  },
  {
    ...defaultArtist,
    _id: "8",
    username: "Jennifer Hanson",
    profilePicture: image2,
  },
  {
    ...defaultArtist,
    _id: "9",
    username: "Leo Messi",
    profilePicture: image3,
  },
  {
    ...defaultArtist,
    _id: "10",
    username: "Cristiano Ronaldo",
    profilePicture: image4,
  },
  {
    ...defaultArtist,
    _id: "11",
    username: "Neymar Jr",
    profilePicture: image5,
  },
  {
    ...defaultArtist,
    _id: "12",
    username: "Kylian Mbappé",
    profilePicture: image6,
  },
];
