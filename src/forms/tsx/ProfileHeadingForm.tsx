import Image from "next/image";
import ProfilePicture from "../../components/profile/profilePicture/ProfilePicture";
import useProfileHeadingForm from "../methods/useProfileHeadingForm";
import { FormProvider } from "react-hook-form";
import { TProfileHeadingData } from "../../zod";
import FileInput from "../../components/form/FileInput";

interface IHeadingProps {
  profilePicture: string;
  banner: string;
}

export default function ProfileHeadingForm(props: IHeadingProps): JSX.Element {
  const methods = useProfileHeadingForm({ profilePicture: props.profilePicture, bannerPicture: props.banner });

  const handleSubmit = async (formData: TProfileHeadingData) => {};

  const onSubmit = async (data: TProfileHeadingData): Promise<void> => {
    await handleSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="grid grid-cols-4 relative h-64" onSubmit={methods.handleSubmit(onSubmit)}>
        {/* <FileInput name="bannerPicture" className="absolute h-64 z-0"> */}
        <Image src={props.banner} alt="profileBanner" className="absolute h-64 z-0" />
        {/* </FileInput> */}
        <div className="col-span-3" />
        <div className="z-10 h-full flex items-center justify-center p-5">
          <FileInput name="profilePicture">
            <ProfilePicture src={props.profilePicture} width={200} height={200} />
          </FileInput>
        </div>
      </form>
    </FormProvider>
  );
}
