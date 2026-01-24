import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import RicePurityTest from "./pages/test/rice-purity-test";
import RicePurityResult from "./pages/test/rice-purity-test/result";
import PoliticalCompassTest from "./pages/test/political-compass-test";
import PoliticalCompassResult from "./pages/test/political-compass-test/result";
import BdsmTest from "./pages/test/bdsm-test";
import BdsmResult from "./pages/test/bdsm-test/result";
import LoveLanguageTest from "./pages/test/love-language-test";
import LoveLanguageResult from "./pages/test/love-language-test/result";
import AttachmentStyleTest from "./pages/test/attachment-style-test";
import AttachmentStyleResult from "./pages/test/attachment-style-test/result";
import BigFiveTest from "./pages/test/big-five-test";
import BigFiveResult from "./pages/test/big-five-test/result";
import EnneagramTest from "./pages/test/enneagram-test";
import EnneagramResult from "./pages/test/enneagram-test/result";
import SixteenPersonalityTest from "./pages/test/16-personality-test";
import SixteenPersonalityResult from "./pages/test/16-personality-test/result";
import MoralAlignmentTest from "./pages/test/moral-alignment-test";
import MoralAlignmentResult from "./pages/test/moral-alignment-test/result";
import IntrovertExtrovertTest from "./pages/test/introvert-extrovert-test";
import IntrovertExtrovertResult from "./pages/test/introvert-extrovert-test/result";
import EmotionalIntelligenceTest from "./pages/test/emotional-intelligence-test";
import EmotionalIntelligenceResult from "./pages/test/emotional-intelligence-test/result";
import CareerAptitudeTest from "./pages/test/career-aptitude-test";
import CareerAptitudeResult from "./pages/test/career-aptitude-test/result";
import CommunicationStyleTest from "./pages/test/communication-style-test";
import CommunicationStyleResult from "./pages/test/communication-style-test/result";
import LoveCompatibilityTest from "./pages/test/love-compatibility-test";
import LoveCompatibilityResult from "./pages/test/love-compatibility-test/result";
import SelfEsteemTest from "./pages/test/self-esteem-test";
import SelfEsteemTestResult from "./pages/test/self-esteem-test/result";
import AnxietyCalmTest from "./pages/test/anxiety-calm-test";
import AnxietyCalmTestResult from "./pages/test/anxiety-calm-test/result";
import MentalAgeTest from "./pages/test/mental-age-test";
import MentalAgeResult from "./pages/test/mental-age-test/result";
import DarkTriadTest from "./pages/test/dark-triad-test";
import DarkTriadResult from "./pages/test/dark-triad-test/result";
import ToxicTraitTest from "./pages/test/toxic-trait-test";
import ToxicTraitResult from "./pages/test/toxic-trait-test/result";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/test/rice-purity" element={<RicePurityTest />} />
            <Route path="/test/rice-purity/result/" element={<RicePurityResult />} />
            <Route path="/test/political-compass-test" element={<PoliticalCompassTest />} />
            <Route path="/test/political-compass-test/result/" element={<PoliticalCompassResult />} />
            <Route path="/test/bdsm-test" element={<BdsmTest />} />
            <Route path="/test/bdsm-test/result/" element={<BdsmResult />} />
            <Route path="/test/love-language-test" element={<LoveLanguageTest />} />
            <Route path="/test/love-language-test/result/" element={<LoveLanguageResult />} />
            <Route path="/test/attachment-style-test" element={<AttachmentStyleTest />} />
            <Route path="/test/attachment-style-test/result/" element={<AttachmentStyleResult />} />
            <Route path="/test/big-five-test" element={<BigFiveTest />} />
            <Route path="/test/big-five-test/result/" element={<BigFiveResult />} />
            <Route path="/test/enneagram-test" element={<EnneagramTest />} />
            <Route path="/test/enneagram-test/result/" element={<EnneagramResult />} />
            <Route path="/test/16-personality-test" element={<SixteenPersonalityTest />} />
            <Route path="/test/16-personality-test/result/" element={<SixteenPersonalityResult />} />
            <Route path="/test/moral-alignment-test" element={<MoralAlignmentTest />} />
            <Route path="/test/moral-alignment-test/result/" element={<MoralAlignmentResult />} />
            <Route path="/test/introvert-extrovert-test" element={<IntrovertExtrovertTest />} />
            <Route path="/test/introvert-extrovert-test/result/" element={<IntrovertExtrovertResult />} />
            <Route path="/test/emotional-intelligence-test" element={<EmotionalIntelligenceTest />} />
            <Route path="/test/emotional-intelligence-test/result/" element={<EmotionalIntelligenceResult />} />
            <Route path="/test/career-aptitude-test" element={<CareerAptitudeTest />} />
            <Route path="/test/career-aptitude-test/result/" element={<CareerAptitudeResult />} />
            <Route path="/test/communication-style-test" element={<CommunicationStyleTest />} />
            <Route path="/test/communication-style-test/result/" element={<CommunicationStyleResult />} />
            <Route path="/test/love-compatibility-test" element={<LoveCompatibilityTest />} />
            <Route path="/test/love-compatibility-test/result/" element={<LoveCompatibilityResult />} />
            <Route path="/test/self-esteem-test" element={<SelfEsteemTest />} />
            <Route path="/test/self-esteem-test/result/" element={<SelfEsteemTestResult />} />
            <Route path="/test/anxiety-calm-test" element={<AnxietyCalmTest />} />
            <Route path="/test/anxiety-calm-test/result/" element={<AnxietyCalmTestResult />} />
            <Route path="/test/mental-age-test" element={<MentalAgeTest />} />
            <Route path="/test/mental-age-test/result/" element={<MentalAgeResult />} />
            <Route path="/test/dark-triad-test" element={<DarkTriadTest />} />
            <Route path="/test/dark-triad-test/result/" element={<DarkTriadResult />} />
            <Route path="/test/toxic-trait-test" element={<ToxicTraitTest />} />
            <Route path="/test/toxic-trait-test/result/" element={<ToxicTraitResult />} />
            <Route path="/about/" element={<About />} />
            <Route path="/privacy/" element={<Privacy />} />
            <Route path="/terms/" element={<Terms />} />
            <Route path="/contact/" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
