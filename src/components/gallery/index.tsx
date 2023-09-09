import React, { useState } from "react";
import "./index.css";

export interface IGalleryProps {
  redirectUrl: string;
  redirectText: string;
}

function Gallery(props: IGalleryProps | {}) {
  const [pictures, setPictures] = useState<string[]>([]);

  React.useEffect(() => {
    const seedData = [
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://media.cdnws.com/_i/119489/433/3867/37/jm-arthot-newlessables-044-liberte-time-workofart-frame.jpeg ",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
      "https://irisphoto.art/web/image/65508/19-98-31.jpg",
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      "https://tds-images.thedailystar.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/10/14/ai_art_generator.png?itok=kgyM3PUE",
    ];
    setPictures(seedData);
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <label className="text-6xl font-extrabold mt-7">
          <span className="text-[#E11C0A]">Leon</span>
          <span className="text-[#000000]">'Art</span>
        </label>
        {"redirectUrl" in props && (
          <a href={props.redirectUrl}>
            <button className="absolute mt-9 right-7 rounded-[30px] shadow-md px-4 py-3 border border-[#b6b6b6] text-xl font-extrabold text-[#E11C0A] cursor-pointer hover:bg-[#fcfcfc] hover:scale-105 transition-transform ease-out">
              {props.redirectText}
            </button>
          </a>
        )}
      </div>
      <div className="flex justify-evenly mt-10">
        <label className="text-4xl font-bold">Artistes</label>
        <label className="text-4xl font-bold">Catégories</label>
        <label className="text-4xl font-bold">Support</label>
        <label className="text-4xl font-bold">Couleurs</label>
      </div>
      <div className="flex justify-center pb-10">
        <div className="grid grid-cols-4 gap-8 place-items-center justify-center mt-8 mx-4">
          {pictures.map((url, index) => (
            <div key={index} className="w-55 h-55 rounded-xl overflow-hidden bg-slate-300">
              <img src={url} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
