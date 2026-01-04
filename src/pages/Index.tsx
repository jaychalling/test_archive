import Header from "@/components/Header";
import TestCard from "@/components/TestCard";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            다양한 테스트를 경험해보세요
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Test<span className="text-gradient">Lab</span>
          </h1>
          
          <p className="text-lg text-muted-foreground">
            재미있고 유익한 테스트 모음집입니다.<br />
            자신에 대해 더 알아보세요.
          </p>
        </section>

        {/* Test Grid */}
        <section className="max-w-4xl mx-auto">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            인기 테스트
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestCard
              title="Rice Purity Test"
              description="당신의 순수함 점수를 측정해보세요. 100점 만점 기준으로 얼마나 순수한지 알아봅니다."
              questionCount={100}
              duration="10-15분"
              path="/test/rice-purity-test"
              icon={<Sparkles className="w-6 h-6" />}
            />
          </div>
        </section>

        {/* Coming Soon */}
        <section className="max-w-4xl mx-auto mt-16">
          <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground">
              더 많은 테스트가 곧 추가될 예정입니다 ✨
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 TestLab. 모든 테스트는 재미를 위한 것입니다.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
