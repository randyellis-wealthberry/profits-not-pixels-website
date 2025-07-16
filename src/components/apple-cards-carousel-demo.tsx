"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Swoosh } from "@/components/ui/swoosh";
import DecryptedHeader from "@/components/ui/DecryptedHeader";
import { useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function AppleCardsCarouselDemo() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px', // Start loading when 200px away
    triggerOnce: true
  });

  // Preload images for faster loading when component becomes visible
  useEffect(() => {
    if (isIntersecting) {
      const imageUrls = data.map(card => card.src);
      imageUrls.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [isIntersecting]);

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div ref={ref} className="w-full h-full py-20">
      {isIntersecting ? (
        <>
          <div className="max-w-7xl mx-auto px-4 space-y-6">
            <Swoosh size="md" className="mx-auto" />
            <DecryptedHeader
              text="Master Boardroom Fluency"
              highlightWords={["Boardroom Fluency"]}
              triggerDelay={500}
              className="text-4xl lg:text-5xl font-light text-center"
            />
          </div>
          <Carousel items={cards} />
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-96 bg-gray-800/20 rounded-lg animate-pulse flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-2 border-gray-600 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
              <div className="text-sm text-gray-500">Loading interactive content...</div>
            </div>
          </div>
        </div>
      )}
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