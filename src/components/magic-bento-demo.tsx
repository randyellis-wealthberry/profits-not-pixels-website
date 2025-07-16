import { BentoCard, BentoGrid } from "@/components/ui/magic-bento";
import { 
  TrendingUp, 
  Users, 
  Target, 
  BookOpen, 
  Lightbulb
} from "lucide-react";

const features = [
  {
    Icon: TrendingUp,
    name: "Strategic Thinking",
    description: "Learn to think beyond pixels and focus on business outcomes that drive revenue growth.",
    cta: "Learn More",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20" />
    ),
  },
  {
    Icon: Users,
    name: "Executive Communication",
    description: "Master the art of presenting design decisions in language that resonates with leadership.",
    cta: "Explore",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-blue-500/20" />
    ),
  },
  {
    Icon: Target,
    name: "Business Metrics",
    description: "Connect design work to KPIs and demonstrate measurable impact on company goals.",
    cta: "Discover",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-orange-500/20" />
    ),
  },
  {
    Icon: BookOpen,
    name: "Frameworks & Templates",
    description: "Ready-to-use frameworks for business cases, presentations, and strategic planning.",
    cta: "Get Access",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20" />
    ),
  },
  {
    Icon: Lightbulb,
    name: "Innovation Leadership",
    description: "Position yourself as a strategic innovator who drives business transformation.",
    cta: "Learn How",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-red-500/20" />
    ),
  },
];

export function MagicBentoDemo() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
      <div className="section-container">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <div className="bg-[#fbbf24] text-black font-semibold px-4 py-2 rounded-lg">
              Strategic Skills
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-light text-white">
            Master the <span className="text-[#fbbf24]">Essential Skills</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform from a creative executor to a strategic business partner with these core competencies.
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-3 auto-rows-[18rem]">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}