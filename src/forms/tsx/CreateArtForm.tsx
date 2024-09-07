"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import Fetcher from "../../components/fetch/Fetcher";
import Checkbox from "../../components/form/Checkbox";
import FileInput from "../../components/form/FileInput";
import Input from "../../components/form/Input";
import TextArea from "../../components/form/TextArea";
import { Button } from "../../components/lib";
import { IError, IOption, IOptionSubOptions } from "../../interfaces";
import { appendFormData } from "../../tools/formData";
import { TCreateArtData } from "../../zod";
import useCreateArtForm from "../methods/useCreateArtForm";
import SelectSubOptions from "../../components/form/SelectSubOptions";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";

export interface ICreateArtFormProps {
  artTypes: IOptionSubOptions<string>[];
  stripeAccountLinked: boolean;
}

export default function CreateArtForm(props: ICreateArtFormProps): JSX.Element {
  const methods = useCreateArtForm();
  const isForSale = methods.watch("isForSale");
  const imageImported = methods.watch("image");
  const router = useRouter();
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState<FormData>();
  const [isImageLightboxOpen, setImageLightboxOpen] = useState(false);

  const handleSubmit = async (zodData: TCreateArtData): Promise<void> => {
    const formData = new FormData();

    appendFormData(formData, zodData);

    setBody(formData);
    setNbFetchs(nbFetchs + 1);
  };

  const onSubmit = async (data: TCreateArtData): Promise<void> => {
    if (!data.artType) {
      methods.setError("artType", { type: "manual", message: "Veuillez sélectionner un type d'art." });
      return;
    }
    if (data.isForSale && !data.price) {
      methods.setError("price", { type: "manual", message: "Remplissez un prix ou décochez 'à vendre'" });
      return;
    }
    data.price = data.isForSale ? data.price : undefined;
    if (data.price) {
      const price = parseFloat(data.price);
      if (price < 0) {
        methods.setError("price", { type: "manual", message: "Le prix doit être positif" });
        return;
      }
    }
    await handleSubmit(data);
  };

  const handleOk = (json: any) => {
    const data = json as { msg: string; artPublication: { _id: string } } | IError;

    if ("artPublication" in data) {
      router.push(`/single/${data.artPublication._id}`);
    }
  };

  function handleCancel() {
    router.back();
  }

  function onCloseLightbox() {
    setImageLightboxOpen(false);
  }

  function onOpenLightbox() {
    setImageLightboxOpen(true);
  }

  return (
    <>
      <Fetcher method="POST" route="/api/art-publication" nbFetchs={nbFetchs} body={body} handleOk={handleOk} />
      <FormProvider {...methods}>
        <form className="flex flex-col w-full gap-14" onSubmit={methods.handleSubmit(onSubmit)}>
          <h1>Publier une nouvelle oeuvre d{"'"}art</h1>
          <div className="flex flex-col gap-4">
            <h2>
              1<sup>ère</sup> étape: Sélectionner une image
            </h2>
            <label className="text-tertiary-hover px-6">La taille de l{"'"}image ne doit pas dépasser les 5MB.</label>
            {imageImported && (
              <>
                <img
                  src={URL.createObjectURL(imageImported)}
                  alt=""
                  className="w-full cursor-zoom-in rounded-2xl"
                  onClick={onOpenLightbox}
                />
                <Lightbox
                  open={isImageLightboxOpen}
                  close={onCloseLightbox}
                  plugins={[Zoom, Fullscreen]}
                  zoom={{
                    maxZoomPixelRatio: 3,
                  }}
                  slides={[
                    {
                      src: URL.createObjectURL(imageImported),
                      alt: "image",
                    },
                  ]}
                  // used to hide the navigation buttons when there is only one slide
                  render={{
                    iconPrev: () => <></>,
                    iconNext: () => <></>,
                  }}
                />
              </>
            )}
            <FileInput name="image" maxFileSize={5} /> {/* 5MB */}
          </div>
          <div className="flex flex-col gap-4">
            <h2>
              2<sup>ème</sup> étape: Donner des détails sur l{"'"}oeuvre
            </h2>
            <Input name="name" placeholder="Titre" type="text" className="bg-secondary rounded" />
            <TextArea name="description" placeholder="Description" className="bg-secondary rounded" />
            <SelectSubOptions
              name="artType"
              title="Type d'art"
              options={props.artTypes}
              placeholder="Sélectionner le type d'œuvre d'art"
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2>
              3<sup>ème</sup> étape: Mise en vente potentielle
            </h2>
            <div className="flex flex-col gap-6">
              <span className="text-lg italic">
                Information importante: pour l{"'"}instant notre application est en phase Bêta. Les paiements sont donc
                factices.
              </span>
              <div className="px-4">
                <Checkbox name="isForSale" title="À vendre" />
              </div>
              {isForSale &&
                (props.stripeAccountLinked ? (
                  <div className="flex flex-row items-center">
                    <Input name="price" placeholder="Prix" type="number" className="bg-secondary rounded" />
                    <label className="text-tertiary-hover text-xl px-6">€</label>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <label className="text-lg">
                      Votre compte n’est pas configurérer pour être vendeur pour l’instant<br></br>
                      Vous pouvez modifier cela en créant ou en connectant votre compte de payement Stripe.
                    </label>
                    <Link href="/settings/me" className="text-primary text-lg hover:underline">
                      Aller à mes informations personnelles
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <Button color="secondary" type="button" onClick={handleCancel}>
              Annuler
            </Button>
            <Button color="danger" type="submit" disabled={isForSale && !props.stripeAccountLinked}>
              Publier
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
