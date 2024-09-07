"use client";

import React, { useState, useEffect } from "react";
import Pictures from "./Pictures";
import { myFetch } from "../../tools/myFetch";

export interface IGalleryProps {
  redirectUrl: string;
  redirectText: string;
}

const NEXT_PUBLIC_IMAGE_GENERATOR_ACCESS_KEY = process.env.NEXT_PUBLIC_IMAGE_GENERATOR_ACCESS_KEY;
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function Gallery(props: IGalleryProps | { title?: boolean }) {
  const [pictures, setPictures] = useState<string[]>([]);

  async function fetchBackendImages(): Promise<string[]> {
    try {
      const response = await myFetch({
        route: `/api/art-publication/images`,
        method: "GET",
      });

      if (response.ok) {
        const images = await response.json;
        return images.map((img: string) => `${NEXT_PUBLIC_BACKEND_URL}/api/${img}`);
      } else {
        console.error("Erreur lors de la récupération des images du backend");
        return [];
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des images du backend", error);
      return [];
    }
  }

  async function fetchUnsplashImages(): Promise<string[]> {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?count=30&client_id=${NEXT_PUBLIC_IMAGE_GENERATOR_ACCESS_KEY}`);

      if (response.ok) {
        const unsplashData = await response.json();
        return unsplashData.map((img: any) => img.urls.small);
      } else {
        console.error("Erreur lors de la récupération des images Unsplash");
        return [];
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des images Unsplash", error);
      return [];
    }
  }

  useEffect(() => {
    async function loadImages() {
      const backendImages = await fetchBackendImages();

      if (backendImages.length < 20) {
        const unsplashImages = await fetchUnsplashImages();
        setPictures([...backendImages, ...unsplashImages.slice(0, 20 - backendImages.length)]); // Limite à 20 images au total
      } else {
        setPictures(backendImages);
      }
    }

    loadImages();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <label className="text-6xl font-extrabold mt-7">
          <span className="text-primary cursor-default">Leon</span>
          <span className="text-tertiary cursor-default">{"'"}Art</span>
        </label>
        {"redirectUrl" in props && (
          <a href={props.redirectUrl}>
            <button className="absolute mt-9 right-7 rounded-[30px] shadow-md px-4 py-3 border border-secondary text-xl font-extrabold text-primary cursor-pointer hover:bg-secondary-hover hover:scale-105 transition-transform ease-out">
              {props.redirectText}
            </button>
          </a>
        )}
      </div>
      <div className="flex justify-evenly mt-10">
        <label className="text-4xl font-bold text-tertiary">Artistes</label>
        <label className="text-4xl font-bold text-tertiary">Catégories</label>
        <label className="text-4xl font-bold text-tertiary">Support</label>
        <label className="text-4xl font-bold text-tertiary">Couleurs</label>
      </div>
      <div className="flex justify-center pb-10">
        <Pictures pictures={pictures} />
      </div>
    </div>
  );
}

export default Gallery;
