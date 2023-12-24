"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import useWindowSize from "@/hooks/useWindowSize";

export default function Slider({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);

  const scrollDivRef = useRef(null);

  const { width } = useWindowSize();

  const slides: SlideImage[] = images.map((image) => ({
    src: image,
    width: width && (width < 768 ? width : 900),
    height: width && (width < 768 ? 300 : 600),
  }));

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
                index={index}
                setClickedImageIndex={setClickedImageIndex}
                setIsOpen={setIsOpen}
              />
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        index={clickedImageIndex}
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        plugins={[Captions, Thumbnails]}
        carousel={{
          imageFit: "cover",
        }}
        thumbnails={{
          border: 0,
        }}
      />
    </>
  );
}

function Card({
  image,
  index,
  setClickedImageIndex,
  setIsOpen,
}: {
  image: string;
  index: number;
  setIsOpen: (v: boolean) => void;
  setClickedImageIndex: (v: number) => void;
}) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={classNames("overflow-hidden w-[390px] rounded-xl")}>
      <Image
        onClick={() => {
          setClickedImageIndex(index);
          setIsOpen(true);
        }}
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
