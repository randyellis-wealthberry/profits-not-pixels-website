import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconTrendingUp,
  IconUsers,
  IconTarget,
  IconBrandSketch,
  IconPresentationAnalytics,
  IconBulb,
  IconRocket,
} from "@tabler/icons-react";

export default function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-6xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-gray-700/50 to-gray-800/50"></div>
);

const items = [
  {
    title: "Strategic Impact",
    description: "Transform from executing tasks to driving business outcomes. Learn to connect design decisions to revenue growth.",
    header: <Skeleton />,
    icon: <IconTrendingUp className="h-8 w-8 text-[#fbbf24] mb-2" />,
  },
  {
    title: "Executive Presence",
    description: "Command respect in C-suite meetings. Present design work that resonates with business leaders and stakeholders.",
    header: <Skeleton />,
    icon: <IconUsers className="h-8 w-8 text-[#fbbf24] mb-2" />,
  },
  {
    title: "Career Acceleration",
    description: "Position yourself for leadership roles. Move beyond traditional design boundaries into strategic positions.",
    header: <Skeleton />,
    icon: <IconTarget className="h-8 w-8 text-[#fbbf24] mb-2" />,
  },
  {
    title: "Design-Business Translation",
    description: "Master the art of translating creative concepts into business value propositions that executives understand and support.",
    header: <Skeleton />,
    icon: <IconBrandSketch className="h-8 w-8 text-[#fbbf24] mb-2" />,
  },
  {
    title: "Data-Driven Decisions",
    description: "Learn to present design choices backed by metrics and analytics that demonstrate clear ROI to stakeholders.",
    header: <Skeleton />,
    icon: <IconPresentationAnalytics className="h-8 w-8 text-[#fbbf24] mb-2" />,
  },
  {
    title: "Innovation Leadership",
    description: "Develop the skills to lead cross-functional teams and drive innovation initiatives from concept to market success.",
    header: <Skeleton />,
    icon: <IconBulb className="h-8 w-8 text-[#fbbf24] mb-2" />,
  },
  {
    title: "Accelerated Growth Path",
    description: "Fast-track your journey from designer to design leader with proven frameworks for boardroom communication and strategic thinking.",
    header: <Skeleton />,
    icon: <IconRocket className="h-8 w-8 text-[#fbbf24] mb-2" />,
  },
];