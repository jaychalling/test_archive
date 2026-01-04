import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import QuestionItem from "@/components/QuestionItem";
import ProgressBar from "@/components/ProgressBar";
import ResultCard from "@/components/ResultCard";
import { ricePurityQuestions } from "@/data/ricePurityQuestions";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const RicePurityTest = () => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const calculateScore = () => {
    return 100 - checkedItems.size;
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setCheckedItems(new Set());
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showResults) {
    return (
      <div className="min-h-screen gradient-hero theme-purity">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            테스트 목록으로
          </Link>

          <ResultCard score={calculateScore()} onReset={handleReset} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero theme-purity">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          테스트 목록으로
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Rice Purity Test
            </h1>
            <p className="text-muted-foreground">
              해당되는 항목을 체크하세요. 경험한 적 있는 것만 선택해주세요.
            </p>
          </div>

          {/* Progress */}
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md py-4 mb-6 -mx-4 px-4">
            <ProgressBar current={checkedItems.size} total={ricePurityQuestions.length} />
          </div>

          {/* Questions */}
          <div className="test-card mb-8">
            <div className="space-y-1">
              {ricePurityQuestions.map((question, index) => (
                <QuestionItem
                  key={index}
                  index={index}
                  question={question}
                  checked={checkedItems.has(index)}
                  onToggle={() => toggleItem(index)}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pb-12">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="gradient-primary border-0 gap-2 px-8 shadow-elevated hover:shadow-card transition-all duration-300"
            >
              <CheckCircle2 className="w-5 h-5" />
              결과 확인하기
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              {checkedItems.size}개 항목 선택됨
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RicePurityTest;
