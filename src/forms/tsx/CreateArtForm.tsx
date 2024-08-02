"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import Fetcher from "../../components/fetch/Fetcher";
import Checkbox from "../../components/form/Checkbox";
import FileInput from "../../components/form/FileInput";
import Input from "../../components/form/Input";
import NumberInput from "../../components/form/NumberInput";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/TextArea";
import { Button } from "../../components/lib";
import { IError, IOption, IOptionSubOptions } from "../../interfaces";
import { appendFormData } from "../../tools/formData";
import { TCreateArtData } from "../../zod";
import useCreateArtForm from "../methods/useCreateArtForm";
import SelectSubOptions from "../../components/form/SelectSubOptions";
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
    const data = json as { msg: string; artPublication: { id: string } } | IError;

    if ("artPublication" in data) {
      router.push(`/single/${data.artPublication.id}`);
    }
  };

  function handleCancel() {
    router.back();
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
              <img src={URL.createObjectURL(imageImported)} alt="image" className="w-full h-fit object-cover rounded" />
            )}
            <FileInput name="image" />
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
                Information importante: pour l{"'"}instant notre application est en phase Bêta. Les paiements sont donc factices.
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
            <Button
              color="danger"
              type="submit"
              disabled={isForSale && !props.stripeAccountLinked}
            >
              Publier
            </Button>
          </div>
          {/* <Fetcher method="POST" route="/api/art-publication" nbFetchs={nbFetchs} body={body} handleOk={handleOk} />
      <Fetcher
        route={"/api/stripe/account-link-status"}
        method="GET"
        nbFetchs={nbFetchsStripeAccountAlreadyLinked}
        handleOk={handleStipeAccountAlreadyLinked}
      />
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-8 py-12 px-16 border-x-2 border-x-gray-400 bg-white h-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="text-2xl font-semibold">Publier</div>
          <div className="sm:grid sm:grid-cols-3 gap-12 flex flex-col flex-1">
            <FileInput name="image" />
            <Select
              name="artType"
              title="Type d'art"
              options={props.artTypes}
              placeholder="Sélectionner le type d'œuvre d'art"
              className="col-span-2"
            />
          </div>
          <div className="flex gap-12 [&>*]:flex-1 sm:flex-wrap sm:flex-row flex-col">
            <Input name="name" placeholder="Titre" type="text" className="bg-secondary p-2 rounded" />
            <div className="border border-gray-400 h-0" />
          </div>
          <div className="flex gap-12 [&>*]:flex-1 sm:flex-wrap sm:flex-row flex-col flex-1">
            <TextArea name="description" placeholder="Description" className="flex-1" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-8 items-center">
                <Checkbox name="isForSale" title="A vendre" />
                {isForSale &&
                  (stripeAccountAlreadyLinked ? (
                    <NumberInput title="Prix (€)" name="price" className="bg-secondary p-2 rounded" />
                  ) : (
                    <div className="flex flex-col gap-4">
                      <span className="font-semibold text-lg text-tertiary">
                        Vous devez lier votre compte Stripe pour vendre une œuvre d&apos;art.
                      </span>
                      <span className="font-normal text-lg text-tertiary">
                        Pour cela, cliquez sur le bouton ci-dessous.
                      </span>
                      <Button color="primary" type="button" className="w-fit" onClick={goToPersonalInformation}>
                        Aller à mes informations personnelles
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Button color="danger" type="submit" className="self-end">
            Publier
          </Button>
        </form>
      </FormProvider> */}
        </form>
      </FormProvider>
    </>
  );
}
