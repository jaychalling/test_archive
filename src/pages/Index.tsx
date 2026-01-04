import Header from "@/components/Header";
import TestCard from "@/components/TestCard";
import { Sparkles, Compass, Heart, HeartHandshake, Users, Brain, Circle, Layers, Scale, Users2 } from "lucide-react";

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
              iconBgColor="bg-pink-500"
            />
            <TestCard
              title="Political Compass Test"
              description="경제적 좌/우와 권위주의/자유주의 축으로 당신의 정치 성향을 2차원 좌표로 분석합니다."
              questionCount={22}
              duration="5-10분"
              path="/political-compass-test"
              icon={<Compass className="w-6 h-6" />}
              iconBgColor="bg-blue-600"
            />
            <TestCard
              title="BDSM 성향 테스트"
              description="성인용 자기 성향 테스트입니다. 관계에서의 역할 선호와 성향을 분석합니다."
              questionCount={25}
              duration="5-10분"
              path="/bdsm-test"
              icon={<Heart className="w-6 h-6" />}
              iconBgColor="bg-rose-700"
            />
            <TestCard
              title="사랑의 언어 테스트"
              description="5가지 사랑의 언어 중 당신의 주요 사랑의 언어를 알아봅니다. 사랑을 표현하고 느끼는 방식을 분석합니다."
              questionCount={30}
              duration="5-10분"
              path="/love-language-test"
              icon={<HeartHandshake className="w-6 h-6" />}
              iconBgColor="bg-red-400"
            />
            <TestCard
              title="애착 유형 테스트"
              description="관계에서의 애착 스타일을 분석합니다. 불안과 회피 축을 기반으로 4가지 유형 중 당신의 애착 유형을 알아봅니다."
              questionCount={24}
              duration="5-10분"
              path="/attachment-style-test"
              icon={<Users className="w-6 h-6" />}
              iconBgColor="bg-teal-500"
            />
            <TestCard
              title="Big Five 성격 테스트"
              description="심리학에서 가장 널리 사용되는 5요인 성격 모델(OCEAN)로 개방성, 성실성, 외향성, 친화성, 신경증을 측정합니다."
              questionCount={50}
              duration="10-15분"
              path="/big-five-test"
              icon={<Brain className="w-6 h-6" />}
              iconBgColor="bg-indigo-500"
            />
            <TestCard
              title="에니어그램 테스트"
              description="9가지 에니어그램 성격 유형으로 당신의 핵심 동기, 두려움, 욕구를 분석하고 날개(Wing) 유형도 함께 알아봅니다."
              questionCount={36}
              duration="5-10분"
              path="/enneagram-test"
              icon={<Circle className="w-6 h-6" />}
              iconBgColor="bg-purple-600"
            />
            <TestCard
              title="16가지 성격 유형 테스트"
              description="4가지 차원(에너지, 정보수집, 의사결정, 생활양식)을 분석하여 16가지 성격 유형 중 당신의 유형을 찾습니다."
              questionCount={40}
              duration="5-10분"
              path="/16-personality-test"
              icon={<Layers className="w-6 h-6" />}
              iconBgColor="bg-emerald-500"
            />
            <TestCard
              title="D&D 성향 테스트"
              description="선/악과 질서/혼돈 두 축을 기준으로 9가지 도덕적 성향(Lawful Good ~ Chaotic Evil) 중 당신의 성향을 찾습니다."
              questionCount={24}
              duration="5-10분"
              path="/moral-alignment-test"
              icon={<Scale className="w-6 h-6" />}
              iconBgColor="bg-amber-500"
            />
            <TestCard
              title="내향/외향성 테스트"
              description="내향-외향 스펙트럼에서 당신의 위치를 찾습니다. 에너지 충전 방식, 사회적 선호도 등 5가지 요소를 분석합니다."
              questionCount={20}
              duration="3-5분"
              path="/introvert-extrovert-test"
              icon={<Users2 className="w-6 h-6" />}
              iconBgColor="bg-orange-500"
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
