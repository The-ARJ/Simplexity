import React from "react";
import Slider from "./Carousel";

const Hero = () => {
  return (
    <div className=" flex justify-around md:h-[450px] gap-10 mx-auto max-w-screen-2xl pt-20 md:pt-28 px-4 ">
      <Slider />
    </div>
  );
};

export default Hero;
