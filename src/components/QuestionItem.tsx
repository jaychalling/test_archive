import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionItemProps {
  index: number;
  question: string;
  checked: boolean;
  onToggle: () => void;
}

const QuestionItem = ({ index, question, checked, onToggle }: QuestionItemProps) => {
  return (
    <div
      onClick={onToggle}
      className={cn(
        "question-item animate-fade-in",
        checked && "checked"
      )}
      style={{ animationDelay: `${Math.min(index * 20, 500)}ms` }}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 mt-0.5",
          checked
            ? "border-primary bg-primary"
            : "border-border hover:border-primary/50"
        )}
      >
        {checked && <Check className="w-4 h-4 text-primary-foreground" />}
      </div>
      
      <div className="flex gap-3 items-start">
        <span className="text-xs font-medium text-muted-foreground min-w-[28px]">
          {index + 1}.
        </span>
        <span className={cn(
          "text-sm transition-colors",
          checked ? "text-foreground" : "text-foreground/80"
        )}>
          {question}
        </span>
      </div>
    </div>
  );
};

export default QuestionItem;
