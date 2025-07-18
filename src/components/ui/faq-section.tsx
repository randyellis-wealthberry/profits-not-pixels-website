import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useFAQDefaultState } from "@/hooks/use-feature-flags";

const faqData = [
  {
    question: "Who is this book for?",
    answer: "This book is designed for designers at all levels who want to advance their careers by learning to speak the language of business. Whether you're a junior designer looking to stand out or a senior designer aiming for leadership roles, this book will help you bridge the gap between design and business strategy."
  },
  {
    question: "What makes this different from other design books?",
    answer: "Unlike books that focus purely on design skills or aesthetics, 'Profits, Not Pixels' specifically addresses the business side of design. It teaches you how to translate your creative work into business value, communicate with executives, and position yourself as a strategic partner rather than just a creative resource."
  },
  {
    question: "How long does it take to read?",
    answer: "The book is designed to be practical and actionable. Most readers complete it in 3-4 hours, but the real value comes from implementing the frameworks and strategies over time. Each chapter includes exercises you can apply immediately to your current projects."
  },
  {
    question: "Will this help me get promoted?",
    answer: "Absolutely. The book teaches you how to demonstrate business impact, build cross-functional relationships, and present your work in ways that resonate with leadership. These are the exact skills that separate designers who get promoted from those who don't."
  },
  {
    question: "Do I need business experience to understand it?",
    answer: "No business background required! The book is written specifically for designers and explains business concepts in design-friendly terms. You'll learn practical frameworks that you can start using immediately, regardless of your business knowledge."
  },
  {
    question: "Is this book only for senior designers?",
    answer: "Not at all. While senior designers will find advanced strategies for leadership, the core principles apply to designers at every level. Junior designers especially benefit from learning these skills early in their careers to accelerate their growth."
  },
  {
    question: "What format is the book available in?",
    answer: "The book is available as an instant digital download in PDF format, optimized for reading on all devices. This means you can start reading immediately after purchase and access it anywhere, anytime."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with the book and don't feel it's helping you advance your design career, simply contact us within 30 days for a full refund."
  }
];

function FAQ() {
  const { defaultOpenItems } = useFAQDefaultState();
  
  return (
    <section className="w-full py-20 lg:py-40" id="faq" aria-label="Frequently asked questions about Profits Not Pixels book" itemScope itemType="https://schema.org/FAQPage">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Common Questions About Profits, Not Pixels
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                  Get answers to the most frequently asked questions about this career-transforming book for designers who want to master boardroom fluency and advance their careers.
                </p>
              </div>
              <div className="">
                <Button className="gap-4" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full" defaultValue={defaultOpenItems[0]}>
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} itemScope itemType="https://schema.org/Question">
                <AccordionTrigger itemProp="name">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                  <span itemProp="text">{faq.answer}</span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export { FAQ };