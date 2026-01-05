import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface CollapsibleFAQProps {
  faqs: FAQItem[];
  title?: string;
}

const CollapsibleFAQ = ({ faqs, title = "Frequently Asked Questions" }: CollapsibleFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6 rounded-xl bg-muted/30 border border-border">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={cn(
                "rounded-lg border transition-all duration-200",
                isOpen
                  ? "bg-primary/5 border-primary/30 shadow-sm"
                  : "bg-card border-border hover:border-primary/20"
              )}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left transition-colors"
              >
                <span className={cn(
                  "font-semibold transition-colors",
                  isOpen ? "text-primary" : "text-foreground"
                )}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                    isOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-200 ease-in-out",
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-5 pb-4 pt-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-center text-muted-foreground">
          Still have questions?{" "}
          <button className="text-primary hover:underline font-medium">
            Contact us
          </button>
        </p>
      </div>
    </div>
  );
};

export default CollapsibleFAQ;
