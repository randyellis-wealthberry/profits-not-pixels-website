"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Master Boardroom Fluency.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Transform your design career from creative executor to strategic leader.
              </span>{" "}
              Learn to translate design decisions into business impact, present with confidence to executives, and position yourself as an indispensable strategic partner in any organization.
            </p>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
              alt="Business strategy meeting"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Business Strategy",
    title: "From Pixels to Profits",
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Executive Communication",
    title: "Speak Their Language",
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Design Leadership",
    title: "Lead with Impact",
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Career Growth",
    title: "Advance Your Career",
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Value Creation",
    title: "Prove Your Worth",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Strategic Thinking",
    title: "Think Like a CEO",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
];