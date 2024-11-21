import { useRef, useState } from "react";
import ReactCrop, { PercentCrop, centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { TProfileHeadingData } from "../../zod";
import { Button } from "../lib";
import { setCanvasPreview } from "./priv/setCanvasPreview";

const MIN_DIMENSION = 150;

interface IImageCropperProps {
  name: keyof TProfileHeadingData;
  closeModal: () => void;
  changeProfile: (file: File) => Promise<void>;
  type: "profilePicture" | "bannerPicture";
}

export default function ImageCropper(props: IImageCropperProps) {
  const aspectRatio = props.type === "profilePicture" ? 1 : window.innerWidth / 256;
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<PercentCrop | undefined>();
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [initialFile, setInitialFile] = useState<File | null>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setInitialFile(file);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("L'image doit faire au moins 150px de large et de haut");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      aspectRatio,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const canvasToFile = (canvas: HTMLCanvasElement) => {
    return new Promise((resolve, reject) => {
      if (initialFile) {
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], initialFile.name, { type: initialFile.type });
            resolve(file);
          } else {
            reject(new Error("La toile est vide"));
          }
        }, initialFile.type);
      } else {
        reject(new Error("Pas de fichier à convertir"));
      }
    });
  };

  const onClick = async () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
      );
      const canvas = previewCanvasRef.current;
      if (canvas) {
        try {
          const file = (await canvasToFile(canvas)) as File;
          setFile(file);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  const onValidate = async () => {
    if (file) {
      props.changeProfile(file);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <label className="block mb-3 w-fit">
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop={props.type === "profilePicture"}
            keepSelection
            aspect={aspectRatio}
            minWidth={MIN_DIMENSION}
          >
            <img ref={imgRef} src={imgSrc} alt="Upload" style={{ maxHeight: "70vh" }} onLoad={onImageLoad} />
          </ReactCrop>
          <button
            className="text-white text-center font-mono text-xs py-2 px-4 rounded-2xl mt-2 bg-sky-500 hover:bg-sky-600"
            onClick={onClick}
          >
            Sélectionner
          </button>
        </div>
      )}
      {crop && (
        <div className="w-full flex flex-col gap-4 items-center bg-neutral-300 rounded p-4 border border-black">
          <canvas
            ref={previewCanvasRef}
            className="bg-neutral-400"
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: props.type === "profilePicture" ? 150 : 436,
              height: props.type === "profilePicture" ? 150 : 450 / aspectRatio,
            }}
          />
          <Button onClick={onValidate} type="button" color="primary" disabled={file === null}>
            Valider
          </Button>
        </div>
      )}
    </div>
  );
}
