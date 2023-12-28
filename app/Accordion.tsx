"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Slider from "./Slider";
import { BiChevronDown } from "react-icons/bi";

const events = [
  {
    title: "جلسة مناقشة",
    date: "23-7-2022",
    imagesCount: 1,
  },
  {
    title: "جلسة مناقشة",
    date: "18-6-2022",
    imagesCount: 1,
  },
  {
    title: "عشاء ومولد بمناسبة ولادة السيدة الزهراء(ع)",
    date: "13-1-2023",
    imagesCount: 3,
  },
  {
    title: "عزيمة غدا مع انتخاب مدير",
    date: "3-6-2022",
    imagesCount: 4,
  },
  {
    title: "جلسة مناقشة",
    date: "28-5-2022",
    imagesCount: 1,
  },
  {
    title: "جلسة مناقشة",
    date: "19-2-2022",
    imagesCount: 4,
  },
  {
    title: "جلسة مناقشة",
    date: "15-1-2022",
    imagesCount: 1,
  },
  {
    title: "جلسة مناقشة",
    date: "15-8-2021",
    imagesCount: 2,
  },
  {
    title: "جلسة مناقشة",
    date: "10-7-2021",
    imagesCount: 1,
  },
  {
    title: "جلسة مناقشة في الطبيعة مع كورونا",
    date: "26-6-2021",
    imagesCount: 3,
  },
  { title: "جلسة مناقشة في المسجد", date: "19-4-2021", imagesCount: 1 },
  { title: "جلسة مناقشة مع عشاء خفيف", date: "17-3-2021", imagesCount: 1 },
  { title: "جلسة مناقشة", date: "16-9-2020", imagesCount: 4 },
  {
    title: "جلسة مناقشة",
    date: "7-3-2020",
    imagesCount: 4,
  },
  {
    title: "جلسة مناقشة مع عيد ميلاد الشيخ مصطفى",
    date: "4-1-2020",
    imagesCount: 4,
  },
  { title: "جلسة مناقشة", date: "7-12-2019", imagesCount: 2 },
  { title: "جلسة مناقشة", date: "24-11-2019", imagesCount: 2 },
];

// sort events by date descending
events.sort((a, b) => convertDate(b.date) - convertDate(a.date));

const years = events
  .map((event) => event.date.split("-")[2])
  .filter((year, index, self) => self.indexOf(year) === index);

const Events = () => {
  const [open, setOpen] = useState(years[0]);

  return (
    <div
      className="flex flex-col w-full shadow overflow-hidden space-y-0.5"
      style={{ direction: "ltr" }}
    >
      {years.map((year) => {
        return (
          <Panel key={year} id={year} open={open} setOpen={setOpen} year={year}>
            {events
              .filter((event) => event.date.includes(year))
              .map((event) => (
                <div key={event.date} className="py-4">
                  <h3 className="text-lg mb-3">
                    {event.title}{" "}
                    <span className="text-gray-500 text-sm">
                      ~ {event.date}
                    </span>
                  </h3>
                  <Slider
                    images={computeImagesUrls(event.date, event.imagesCount)}
                  />
                </div>
              ))}
          </Panel>
        );
      })}
    </div>
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
