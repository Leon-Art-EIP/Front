"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import FileInput from "../../components/form/FileInput";
import { Button, Modal, NotificationToast } from "../../components/lib";
import ProfilePicture from "../../components/profile/profilePicture/ProfilePicture";
import ModifiableImage from "../../components/single-art-page/ModifiableImage";
import { IProfileUser } from "../../interfaces/user/profileUser";
import { myFetch } from "../../tools/myFetch";
import { imageApi } from "../../tools/variables";
import { TProfileHeadingData } from "../../zod";
import useProfileHeadingForm from "../methods/useProfileHeadingForm";

interface IHeadingProps {
  profilePicture: string;
  banner: string;
}

export default function ProfileHeadingForm(props: IHeadingProps): JSX.Element {
  const [notificationToast, setNotificationToast] = useState(false);
  const [currentProfilePicture, setCurrentProfilePicture] = useState<string>(props.profilePicture);
  const [currentBannerPicture, setCurrentBannerPicture] = useState<string>(props.banner);

  const [isProfilePictureModalOpen, setProfilePictureModalOpen] = useState(false);
  const [isBannerPictureModalOpen, setBannerPictureModalOpen] = useState(false);
  const methods = useProfileHeadingForm();

  const profilePicture = methods.watch("profilePicture");
  const bannerPicture = methods.watch("bannerPicture");

  const changeProfile = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append(profilePicture ? "profilePicture" : "bannerPicture", file);

    const response = await myFetch({
      route: `/api/user/profile/${profilePicture ? "profile" : "banner"}-pic`,
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = response.json as IProfileUser;
      if (profilePicture) {
        setCurrentProfilePicture(`${imageApi}/${data.profilePicture}`);
      } else {
        setCurrentBannerPicture(`${imageApi}/${data.bannerPicture}`);
      }
    }
  };

  const onSubmit = async (data: TProfileHeadingData): Promise<void> => {
    if (data.profilePicture) {
      await changeProfile(data.profilePicture);
      handleModalOnClose();
      setNotificationToast(true);
    }
    if (data.bannerPicture) {
      await changeProfile(data.bannerPicture);
      handleModalOnClose();
      setNotificationToast(true);
    }
  };

  const handleProfilePictureOnClick = (): void => {
    setProfilePictureModalOpen(true);
    if (notificationToast) {
      setNotificationToast(false);
    }
  };

  const handleBannerPictureOnClick = (): void => {
    setBannerPictureModalOpen(true);
    if (notificationToast) {
      setNotificationToast(false);
    }
  };

  const handleModalOnClose = (): void => {
    if (isProfilePictureModalOpen) {
      setProfilePictureModalOpen(false);
    }
    if (isBannerPictureModalOpen) {
      setBannerPictureModalOpen(false);
    }
    if (profilePicture) {
      methods.setValue("profilePicture", undefined);
    }
    if (bannerPicture) {
      methods.setValue("bannerPicture", undefined);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="grid grid-cols-4 justify-end relative h-64" onSubmit={methods.handleSubmit(onSubmit)}>
        {notificationToast && <NotificationToast message="Modification réussie" type="success" />}
        <Modal isOpen={isProfilePictureModalOpen || isBannerPictureModalOpen} handleClose={handleModalOnClose}>
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-semibold">
              Importer une nouvelle {isProfilePictureModalOpen ? "photo de profil" : "bannière"}
            </h1>
            <FileInput name={isProfilePictureModalOpen ? "profilePicture" : "bannerPicture"} className="w-96 h-48" />
            {(profilePicture || bannerPicture) && (
              <Button color="danger" type="submit">
                Valider
              </Button>
            )}
          </div>
        </Modal>
        <ModifiableImage
          src={currentBannerPicture}
          alt="profileBanner"
          className="absolute h-64 w-full"
          imageClassName="h-64 overflow-hidden"
          onClick={handleBannerPictureOnClick}
          height={256}
          width={2048}
        />
        <div className="col-span-3" />
        <div className="h-full flex items-center justify-center p-5">
          <ProfilePicture
            src={currentProfilePicture}
            width={200}
            height={200}
            className="z-10 h-full relative"
            modifiable
            onClick={handleProfilePictureOnClick}
          />
        </div>
      </form>
    </FormProvider>
  );
}
