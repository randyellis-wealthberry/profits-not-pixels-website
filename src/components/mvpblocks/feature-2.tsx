'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, Users, Lightbulb } from 'lucide-react';

const features = [
  {
    step: 'Step 1',
    title: 'Business Language',
    content:
      'Learn to translate design decisions into metrics and outcomes that executives understand and value.',
    icon: <TrendingUp className="h-6 w-6 text-[#fbbf24]" />,
    image:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2126&auto=format&fit=crop',
  },
  {
    step: 'Step 2',
    title: 'Strategic Thinking',
    content:
      'Position yourself as a strategic partner who drives business results, not just aesthetic improvements.',
    icon: <Lightbulb className="h-6 w-6 text-[#fbbf24]" />,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 3',
    title: 'Career Growth',
    content:
      'Unlock leadership opportunities and command higher compensation through boardroom fluency.',
    icon: <Users className="h-6 w-6 text-[#fbbf24]" />,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function BoardroomFluencyFeatures() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
      <div className={'section-container p-8 md:p-12'}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative mx-auto mb-12 max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-white">
              Why Boardroom Fluency Matters
            </h2>
            <p className="mt-3 text-gray-300">
              Stop being seen as just a "creative." Learn to speak the language of business and become an indispensable strategic partner.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(251, 191, 36, 0.2) 4.54%, rgba(251, 191, 36, 0.26) 34.2%, rgba(251, 191, 36, 0.1) 77.55%)',
            }}
          ></div>
        </div>
        <hr className="mx-auto mb-10 h-px w-1/2 bg-gray-600" />

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.3,
                  x: 0,
                  scale: index === currentFeature ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14',
                    index === currentFeature
                      ? 'scale-110 border-[#fbbf24] bg-[#fbbf24]/10 text-[#fbbf24] [box-shadow:0_0_15px_rgba(251,191,36,0.3)]'
                      : 'border-gray-600 bg-gray-800',
                  )}
                >
                  {feature.icon}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold md:text-2xl text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300 md:text-base">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              'relative order-1 h-[200px] overflow-hidden rounded-xl border border-[#fbbf24]/20 [box-shadow:0_5px_30px_-15px_rgba(251,191,36,0.3)] md:order-2 md:h-[300px] lg:h-[400px]',
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full transform object-cover transition-transform hover:scale-105"
                        width={1000}
                        height={500}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#1e293b] via-[#1e293b]/50 to-transparent" />

                      <div className="absolute bottom-4 left-4 rounded-lg bg-[#1e293b]/80 p-2 backdrop-blur-sm">
                        <span className="text-xs font-medium text-[#fbbf24]">
                          {feature.step}
                        </span>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
