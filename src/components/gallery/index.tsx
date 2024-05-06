"use client";

import React, { useState } from "react";
import Pictures from "./Pictures";

export interface IGalleryProps {
  redirectUrl: string;
  redirectText: string;
}

function Gallery(props: IGalleryProps | { title?: boolean }) {
  const [pictures, setPictures] = useState<string[]>([]);

  React.useEffect(() => {
    const seedData = [
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://1.bp.blogspot.com/-ekTejpwv2NU/VNPK7wucUlI/AAAAAAAADbs/-ytw6gg_yGUuU04nLn6tp5Ljvud-lWBrACKgB/s1600/FullSizeRender_1.jpg",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
    ];
    setPictures(seedData);
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
