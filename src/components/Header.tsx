import { Link } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-lg text-foreground">
            Test <span className="text-gradient">Archive</span>
          </span>
        </Link>
        
        <nav className="flex items-center gap-4 md:gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Tests
          </Link>
          <Link
            to="/guides/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Guides
          </Link>
          <Link
            to="/about/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:inline"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
