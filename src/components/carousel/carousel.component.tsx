import React from "react";
import { Carousel } from "react-responsive-carousel";

export default function CarouselComponent(props: { images: any[] }) {
  const { images } = props;
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs
      showStatus={false}
      showIndicators={false}
      className="max-w-full h-auto lg:w-1/2 w-fu  ll lg:h-auto object-cover object-center rounded"
    >
      {images.map((image) => (
        <div>
          <img src={image} alt="" />
        </div>
      ))}
    </Carousel>
  );
}
