"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Slider from "./Slider";
import { BiChevronDown } from "react-icons/bi";
import events from "../events";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import useWindowSize from "@/hooks/useWindowSize";

// sort events by date descending
events.sort((a, b) => convertDate(b.date) - convertDate(a.date));

const years = events
  .map((event) => event.date.split("-")[2])
  .filter((year, index, self) => self.indexOf(year) === index);

const Events = () => {
  const [open, setOpen] = useState(years[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);

  const allImages: string[] = [];
  events.forEach((event) => {
    const images = computeImagesUrls(event.date, event.imagesCount);
    allImages.push(...images);
  });

  const { width } = useWindowSize();

  const slides: SlideImage[] = allImages.map((image) => ({
    src: image,
    width: width && (width < 768 ? width : 900),
    height: width && (width < 768 ? 300 : 600),
  }));

  return (
    <>
      <div
        className="flex flex-col w-full shadow overflow-hidden space-y-0.5"
        style={{ direction: "ltr" }}
      >
        {years.map((year) => {
          return (
            <Panel
              key={year}
              id={year}
              open={open}
              setOpen={setOpen}
              year={year}
            >
              {events
                .filter((event) => event.date.includes(year))
                .map((event) => (
                  <div key={event.date} className="py-4">
                    {event.imagesCount > 0 ? (
                      <>
                        <h3 className="text-lg mb-3">
                          {event.title}{" "}
                          <span className="text-gray-500 text-sm">
                            ~ {event.date}
                          </span>
                        </h3>
                        <Slider
                          images={computeImagesUrls(
                            event.date,
                            event.imagesCount
                          )}
                          onClick={(imgSrc) => {
                            // get the image index in all images
                            const imageIndex = allImages.findIndex(
                              (image) => image === imgSrc
                            );
                            setClickedImageIndex(imageIndex);
                            setIsOpen(true);
                          }}
                        />
                      </>
                    ) : (
                      <span className="text-lg">
                        لا يوجد أرشيف لهذا العام 😢
                      </span>
                    )}
                  </div>
                ))}
            </Panel>
          );
        })}
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
};

const Panel = ({
  open,
  setOpen,
  id,
  year,
  children,
}: {
  id: string;
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
  year: string;
  children: React.ReactNode;
}) => {
  const isOpen = open === id;

  const handleClick = () => {
    if (isOpen) {
      setOpen("");
    } else {
      setOpen(id);
      // scroll to top of panel
      const panel = document.getElementById(`archive-${year}`);
      if (panel) {
        setTimeout(() => panel.scrollIntoView({ behavior: "smooth" }), 450);
      }
    }
  };

  return (
    <>
      <button
        id={`archive-${year}`}
        className={`transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse items-center gap-4 relative group duration-200 ease-in-out text-white bg-[#4A8781]`}
        onClick={handleClick}
      >
        <span className="block text-xl font-light">أرشيف عام {year}</span>

        <BiChevronDown
          className={`mr-auto ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.48 }}
            style={{ direction: "rtl" }}
            className="w-full relative overflow-y-scroll"
          >
            <div className="px-4 py-2 backdrop-blur-sm">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Events;

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

function computeImagesUrls(date: string, imagesCount: number) {
  const images = [];
  for (let i = 1; i <= imagesCount; i++) {
    images.push(`/images/${date}/${i}.jpeg`);
  }
  return images;
}

function convertDate(dateStr: string) {
  const parts = dateStr.split("-").map((part) => Number(part));
  return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
}
