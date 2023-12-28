import Events from "./Events";

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

      <div className="pb-12">
        <h2 className="mb-10 mt-14 text-lg">
          بدأت جلسات المناقشة الأسبوعية في كتاب روح المجتمع في 1-7-2018 وهي
          مستمرة حتى يومنا هذا في عربصاليم مساء كل جمعة.
        </h2>
        <Events />
      </div>
    </main>
  );
}
