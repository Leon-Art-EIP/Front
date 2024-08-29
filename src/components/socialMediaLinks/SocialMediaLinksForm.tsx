import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

export interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
}

const TikTokIcon = ({ color = "#000000" }) => {
  return (
    <svg fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="48px" height="48px">
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};

interface SocialMediaLinksFormProps {
  initialLinks: SocialMediaLinks | undefined;
  onSubmit: (links: SocialMediaLinks) => void;
}

const SocialMediaLinksForm: React.FC<SocialMediaLinksFormProps> = ({ initialLinks, onSubmit }) => {
  const methods = useForm<SocialMediaLinks>({
    defaultValues: initialLinks,
  });

  useEffect(() => {
    if (initialLinks) {
      methods.reset(initialLinks);
    }
  }, [initialLinks, methods]);

  const handleSubmit = (data: SocialMediaLinks) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-col gap-4 px-4">
        <div className="flex gap-2">
          <Facebook className="text-5xl" />
          <input
            type="url"
            {...methods.register("facebook")}
            className="bg-secondary px-6 rounded placeholder:text-tertiary-hover w-full"
            placeholder="Entrez le lien vers votre compte Facebook"
          />
        </div>
        <div className="flex gap-2">
          <Twitter className="text-5xl" />
          <input
            type="url"
            {...methods.register("twitter")}
            className="bg-secondary px-6 rounded placeholder:text-tertiary-hover w-full"
            placeholder="Entrez le lien vers votre compte Twitter"
          />
        </div>
        <div className="flex gap-2">
          <Instagram className="text-5xl" />
          <input
            type="url"
            {...methods.register("instagram")}
            className="bg-secondary px-6 rounded placeholder:text-tertiary-hover w-full"
            placeholder="Entrez le lien vers votre compte Instagram"
          />
        </div>
        <div className="flex gap-2">
          <TikTokIcon />
          <input
            type="url"
            {...methods.register("tiktok")}
            className="bg-secondary px-6 rounded placeholder:text-tertiary-hover w-full"
            placeholder="Entrez le lien vers votre compte TikTok"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 ml-14 border border-transparent w-fit shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Sauvegarder les liens
        </button>
      </form>
    </FormProvider>
  );
};

export default SocialMediaLinksForm;
