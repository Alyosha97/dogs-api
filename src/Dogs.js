import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
  },
};
const Dogs = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const getImages = () => {
      for (let i = 0; i < 3; i++) {
        fetch("https://dog.ceo/api/breeds/image/random")
          .then((response) => response.json())
          .then((data) => setUrls((oldState) => [...oldState, data.message]));
      }
    };
    getImages();
  }, []);
  return (
    <div>
      <Carousel
        responsive={responsive}
        arrows
        autoPlaySpeed={3000}
        renderDotsOutside={false}
        showDots
      >
        {urls.map((url) => (
          <div key={url} style={{ textAlign: "center" }}>
            <img alt="" style={{ width: 400 }} src={url} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default Dogs;
