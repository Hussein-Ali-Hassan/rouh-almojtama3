"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function Slider({
  images,
  onClick,
}: {
  images: string[];
  onClick: (imgSrc: string) => void;
}) {
  const scrollDivRef = useRef(null);

  return (
    <>
      <div className="relative">
        <div
          ref={scrollDivRef}
          className="flex overflow-x-scroll scroll-smooth no-scrollbar relative"
        >
          <div className="flex gap-x-3 flex-nowrap">
            {images.map((image, index) => (
              <Card
                key={image}
                image={image}
                totalImages={images.length}
                index={index}
                onClick={onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Card({
  image,
  index,
  onClick,
  totalImages,
}: {
  image: string;
  index: number;
  totalImages: number;
  onClick: (imgSrc: string) => void;
}) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={classNames(
        "overflow-hidden rounded-xl",
        totalImages === 1 ? "w-full md:w-[355px]" : "w-[355px]"
      )}
    >
      <Image
        onClick={() => onClick(image)}
        width={500}
        height={500}
        src={String(image)}
        alt={image}
        className={classNames(
          "cursor-pointer bg-gray-400 w-full aspect-video hover:scale-105 duration-300 ease-in-out object-cover rounded-xl",
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        )}
        onLoad={() => {
          setLoading(false);
        }}
      />
    </div>
  );
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
