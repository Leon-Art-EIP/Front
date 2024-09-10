"use client";

import { useState } from "react";
import ImageCropper from "../../components/image/ImageCropper";
import { Modal, NotificationToast } from "../../components/lib";
import ProfilePicture from "../../components/profile/profilePicture/ProfilePicture";
import ModifiableImage from "../../components/single-art-page/ModifiableImage";
import { IProfileUser } from "../../interfaces/user/profileUser";
import { myFetch } from "../../tools/myFetch";
import { imageApi } from "../../tools/variables";

interface IHeadingProps {
  profilePicture: string;
  banner: string | { src: string };
}

export default function ProfileHeadingForm(props: IHeadingProps): JSX.Element {
  const src = typeof props.banner === "string" ? props.banner : props.banner.src;

  const [currentProfilePicture, setCurrentProfilePicture] = useState(props.profilePicture);
  const [currentBannerPicture, setCurrentBannerPicture] = useState(src);

  const [isProfilePictureModalOpen, setProfilePictureModalOpen] = useState(false);
  const [isBannerPictureModalOpen, setBannerPictureModalOpen] = useState(false);

  const [notificationToast, setNotificationToast] = useState<"error" | "success" | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleProfilePictureOnClick = (): void => {
    setProfilePictureModalOpen(true);
    setNotificationToast(null);
  };

  const handleBannerPictureOnClick = (): void => {
    setBannerPictureModalOpen(true);
    setNotificationToast(null);
  };

  const handleModalOnClose = () => {
    if (isProfilePictureModalOpen) {
      setProfilePictureModalOpen(false);
    }
    if (isBannerPictureModalOpen) {
      setBannerPictureModalOpen(false);
    }
  };

  const changeProfile = async (file: File): Promise<void> => {
    handleModalOnClose();
    const formData = new FormData();
    formData.append(isProfilePictureModalOpen ? "profilePicture" : "bannerPicture", file);
    const response = await myFetch({
      route: `/api/user/profile/${isProfilePictureModalOpen ? "profile" : "banner"}-pic`,
      method: "POST",
      body: formData,
      successStr: "Image modifiée avec succès",
    });
    let notifToast: "error" | "success" = "success";
    if (response.ok) {
      const data = response.json as IProfileUser;
      if (isProfilePictureModalOpen) {
        setCurrentProfilePicture(`${imageApi}/${data.profilePicture}`);
      } else {
        setCurrentBannerPicture(`${imageApi}/${data.bannerPicture}`);
      }
    } else {
      notifToast = "error";
    }
    handleModalOnClose();
    if (response.message) {
      setMessage(response.message);
    }
    setNotificationToast(notifToast);
  };

  return (
    <div className="shrink-0 relative h-64">
      {notificationToast && <NotificationToast message={message} type={notificationToast} />}
      <Modal isOpen={isProfilePictureModalOpen || isBannerPictureModalOpen} handleClose={handleModalOnClose}>
        <ImageCropper
          name={isProfilePictureModalOpen ? "profilePicture" : "bannerPicture"}
          closeModal={handleModalOnClose}
          changeProfile={changeProfile}
          type={isProfilePictureModalOpen ? "profilePicture" : "bannerPicture"}
        />
      </Modal>
      <ModifiableImage
        src={currentBannerPicture}
        alt="profileBanner"
        className="absolute h-64 w-screen"
        imageClassName="h-64 w-screen object-cover bg-secondary"
        onClick={handleBannerPictureOnClick}
        height={256}
        width={2048}
      />
      <div className="flex items-center lg:justify-end justify-center lg:mx-28 mt-10">
        <ProfilePicture
          src={currentProfilePicture}
          width={200}
          height={200}
          className="relative"
          imageClassName="w-48 h-48 object-contain bg-black"
          modifiable
          onClick={handleProfilePictureOnClick}
        />
      </div>
    </div>
  );
}
