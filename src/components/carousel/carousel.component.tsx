import React from "react";
import { Carousel } from "react-responsive-carousel";
import uuid from "react-uuid";

export default function CarouselComponent(props: { images: any[] }) {
  const { images } = props;
  return (
    <Carousel
      showThumbs
      showStatus={false}
      showIndicators={false}
      className="max-w-full h-auto lg:w-1/2 w-full lg:h-auto object-cover object-center rounded m-auto"
    >
      {images.map((image) => (
        <div key={uuid()}>
          <img src={image} alt="" />
        </div>
      ))}
    </Carousel>
  );
}
