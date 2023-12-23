import Slider from "./Slider";

const events = [
  { title: "جلسة مناقشة", date: "24-11-2019", imagesCount: 2 },
  { title: "جلسة مناقشة", date: "7-12-2019", imagesCount: 2 },
  {
    title: "جلسة مناقشة مع عيد ميلاد الشيخ مصطفى",
    date: "4-1-2020",
    imagesCount: 4,
  },
];

// sort events by date descending
events.sort((a, b) => convertDate(b.date) - convertDate(a.date));

export default function Home() {
  return (
    <main className="px-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero.jpg"
        alt="Hero image"
        className="mx-auto mt-6 md:h-96 rounded-lg"
      />
      <div className="text-center mt-2">
        <h1 className="text-3xl font-bold text-[#223060]">روح المجتمع</h1>
        <p className="text-xl mt-1.5">
          المشروع الإسلامي الاجتماعي الكبير على طريق بناء الحضارة الإسلامّية
          الجديدة
        </p>
        <p className="mt-1 text-xl text-[#4A8781] font-bold">
          للإمـام الخـامـنئي دام ظّله
        </p>
      </div>
      <div className="lg:px-2">
        <h2 className="my-10 text-lg">
          بدأت جلسات المناقشة الأسبوعية في كتاب روح المجتمع في 1-7-2018 وهي
          مستمرة حتى يومنا هذا في عربصاليم مساء كل جمعة
        </h2>
        {events.map((event) => (
          <div key={event.date} className="py-5">
            <h3 className="text-lg mb-3">
              {event.title}{" "}
              <span className="text-gray-500 text-sm">~ {event.date}</span>
            </h3>
            <Slider images={computeImagesUrls(event.date, event.imagesCount)} />
          </div>
        ))}
      </div>
    </main>
  );
}

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
