import {
  TrendingUp,
  Users,
  Lightbulb,
  Target,
  BarChart3,
  Crown,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the feature item type
type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  position?: 'left' | 'right';
  cornerStyle?: string;
};

// Create feature data arrays for left and right columns
const leftFeatures: FeatureItem[] = [
  {
    icon: TrendingUp,
    title: 'Business Language',
    description:
      'Master the art of translating design decisions into metrics and outcomes that executives understand and value.',
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-br-[2px]',
  },
  {
    icon: Target,
    title: 'Strategic Impact',
    description:
      'Learn to position design as a profit center and demonstrate clear ROI on creative decisions.',
    position: 'left',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-br-[2px]',
  },
  {
    icon: Crown,
    title: 'Leadership Skills',
    description:
      'Develop executive presence and communication skills needed for design leadership roles.',
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-tr-[2px]',
  },
];

const rightFeatures: FeatureItem[] = [
  {
    icon: BarChart3,
    title: 'Data-Driven Design',
    description:
      'Learn to measure and communicate design impact through analytics and business KPIs.',
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-bl-[2px]',
  },
  {
    icon: Users,
    title: 'Cross-Functional Collaboration',
    description:
      'Build relationships with stakeholders and align design goals with business objectives.',
    position: 'right',
    cornerStyle: 'sm:translate-x-4 sm:rounded-bl-[2px]',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Framework',
    description:
      'Develop a systematic approach to presenting creative solutions that drive business growth.',
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-tl-[2px]',
  },
];

// Feature card component
const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  const Icon = feature.icon;

  return (
    <div>
      <div
        className={cn(
          'relative rounded-2xl px-4 py-6 lg:px-6 lg:py-8 text-sm',
          'bg-gray-800/50 ring-1 ring-gray-700 hover:ring-[#fbbf24]/20 transition-all duration-300 hover:bg-gray-800/70',
          feature.cornerStyle,
        )}
      >
        <div className="mb-3 text-[2rem] text-[#fbbf24]">
          <Icon />
        </div>
        <h2 className="mb-2.5 text-xl lg:text-2xl text-white font-semibold">{feature.title}</h2>
        <p className="text-pretty text-sm lg:text-base text-gray-300 leading-relaxed">
          {feature.description}
        </p>
        {/* Decorative elements */}
        <span className="absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-[#fbbf24]/0 via-[#fbbf24] to-[#fbbf24]/0 opacity-60"></span>
        <span className="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,rgba(251,191,36,0.15)_0%,transparent_100%)] opacity-60"></span>
      </div>
    </div>
  );
};

export default function BoardroomFluencyFeatures() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1e293b] to-[#0f172a]" id="features">
      <div className="section-container mx-4 sm:mx-6 max-w-7xl pb-16 pt-2 lg:mx-auto">
        <div className="flex flex-col-reverse gap-6 lg:gap-8 md:grid md:grid-cols-3 xl:gap-12">
          {/* Left column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {leftFeatures.map((feature, index) => (
              <FeatureCard key={`left-feature-${index}`} feature={feature} />
            ))}
          </div>

          {/* Center column */}
          <div className="order-[1] mb-6 self-center sm:order-[0] md:mb-0 px-2 sm:px-4">
            <div className="mb-6 relative mx-auto w-fit rounded-full rounded-bl-[2px] bg-gray-800/50 px-4 py-2 text-sm text-[#fbbf24] ring-1 ring-gray-700 font-medium">
              <span className="z-1 relative flex items-center gap-2">
                Core Skills
              </span>
              <span className="absolute -bottom-px left-1/2 h-px w-2/5 -translate-x-1/2 bg-gradient-to-r from-[#fbbf24]/0 via-[#fbbf24] to-[#fbbf24]/0"></span>
              <span className="absolute inset-0 bg-[radial-gradient(30%_40%_at_50%_100%,rgba(251,191,36,0.25)_0%,transparent_100%)]"></span>
            </div>
            <h2 className="mb-2 text-center text-2xl text-white sm:mb-2.5 md:text-3xl lg:text-4xl font-bold">
              Why Boardroom Fluency Matters
            </h2>
            <p className="mx-auto max-w-[20rem] text-pretty text-center text-gray-300 text-base lg:text-lg leading-relaxed">
              Stop being seen as just a "creative." Learn to speak the language of business and become an indispensable strategic partner.
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {rightFeatures.map((feature, index) => (
              <FeatureCard key={`right-feature-${index}`} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
