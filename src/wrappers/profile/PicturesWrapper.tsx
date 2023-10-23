"use client";

import { useEffect, useState } from "react";
import Pictures from "../../components/gallery/Pictures";

export default function PicturesWrapper(): JSX.Element {
  const [pictures, setPictures] = useState<string[]>([]);

  useEffect(() => {
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

  return <Pictures pictures={pictures} />;
}
