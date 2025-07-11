"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 rounded-3xl bg-gray-800/50 border border-gray-700 shadow-lg max-w-xs w-full" key={i}>
                  <div className="text-gray-300 mb-6">{text}</div>
                  <div className="flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-white">{name}</div>
                      <div className="leading-5 text-gray-400 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "This book completely transformed how I present design work to executives. I finally speak their language and see real impact.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1c7?w=400&h=400&fit=crop&crop=face",
    name: "Sarah Martinez",
    role: "Senior UX Designer",
  },
  {
    text: "The frameworks in 'Profits, Not Pixels' helped me position design as a strategic business driver. My career trajectory changed overnight.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    name: "David Chen",
    role: "Design Director",
  },
  {
    text: "I went from being seen as 'just the creative' to becoming a trusted business partner. This book is a game-changer for designers.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    name: "Emily Johnson",
    role: "Product Designer",
  },
  {
    text: "Finally, a book that bridges the gap between beautiful design and business results. Essential reading for any ambitious designer.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    name: "Michael Rodriguez",
    role: "Creative Director",
  },
  {
    text: "The strategic thinking approaches in this book elevated my design practice and helped me secure my first leadership role.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    name: "Jessica Park",
    role: "Design Manager",
  },
  {
    text: "This book taught me to translate design decisions into business impact. My presentations to stakeholders are now incredibly effective.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    name: "Alex Thompson",
    role: "UX Lead",
  },
  {
    text: "From pixel-pusher to profit-driver - this book showed me how to position design work for maximum business impact.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    name: "Rachel Kim",
    role: "Visual Designer",
  },
  {
    text: "The executive presence techniques in this book helped me command respect in C-suite meetings. Invaluable for career growth.",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    name: "James Wilson",
    role: "Head of Design",
  },
  {
    text: "This book demystified the business side of design. I now confidently present ROI and strategic value to executives.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    name: "Maria Garcia",
    role: "Senior Designer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-[#1e293b]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex justify-center">
            <div className="bg-[#fbbf24] text-black font-semibold px-4 py-2 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-white">
            What <span className="text-[#fbbf24]">Readers</span> Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what designers are saying about transforming their careers from creative executors to strategic leaders.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;