import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TestCardProps {
  title: string;
  description: string;
  questionCount: number;
  duration: string;
  path: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

const TestCard = ({ title, description, questionCount, duration, path, icon, iconBgColor }: TestCardProps) => {
  return (
    <Link to={path} className="block group">
      <div className="test-card">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${iconBgColor || 'gradient-primary'}`}>
            {icon}
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
        </div>
        
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            {questionCount}문항
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
            약 {duration}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TestCard;
