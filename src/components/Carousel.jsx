"use client";
import React from "react";
import {
  Carousel,
  Typography,
  Button,
} from "@/components/MaterialComponents/Material-Tailwind";
import clothingData from "../utils/Data/clothingData";
import Link from "next/link";

export default function Slider() {
  const { slides } = clothingData;

  return (
    <Carousel
      autoplay={true}
      loop={true}
      className="rounded-xl overflow-hidden"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {slides.map((slide, index) => (
        <div key={index} className="relative h-40 md:h-full w-full">
          <img
            src={slide.image}
            alt={`image ${index + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full items-center ">
            <div className="w-3/4 pl-4 md:w-2/4 md:pl-20 lg:pl-32">
              <Typography
                variant="h1"
                color="white"
                className=" mb-1 md:mb-4 text-lg md:text-4xl lg:text-5xl"
              >
                {slide.title}
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className=" mb-2 md:mb-12 opacity-80  text-xs md:text-xl"
              >
                {slide.description}
              </Typography>
              <div className="flex gap-2">
                <Link href="/shop">
                  <Button
                    color="white"
                    className="text-xs px-2 py-1 sm:px-4 sm:py-2 md:text-lg md:px-6 md:py-3 lg:px-8 lg:py-4"
                  >
                    Explore
                  </Button>
                </Link>
                <Button
                  color="white"
                  variant="text"
                  className="text-xs px-2 py-1 sm:px-4 sm:py-2 md:text-lg md:px-6 md:py-3 lg:px-8 lg:py-4"
                >
                  Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
