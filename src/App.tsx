import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RicePurityTest from "./pages/test/rice-purity-test";
import PoliticalCompassTest from "./pages/test/political-compass-test";
import BdsmTest from "./pages/test/bdsm-test";
import LoveLanguageTest from "./pages/test/love-language-test";
import AttachmentStyleTest from "./pages/test/attachment-style-test";
import BigFiveTest from "./pages/test/big-five-test";
import EnneagramTest from "./pages/test/enneagram-test";
import SixteenPersonalityTest from "./pages/test/16-personality-test";
import MoralAlignmentTest from "./pages/test/moral-alignment-test";
import IntrovertExtrovertTest from "./pages/test/introvert-extrovert-test";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/test/rice-purity" element={<RicePurityTest />} />
          <Route path="/test/political-compass-test" element={<PoliticalCompassTest />} />
          <Route path="/test/bdsm-test" element={<BdsmTest />} />
          <Route path="/test/love-language-test" element={<LoveLanguageTest />} />
          <Route path="/test/attachment-style-test" element={<AttachmentStyleTest />} />
          <Route path="/test/big-five-test" element={<BigFiveTest />} />
          <Route path="/test/enneagram-test" element={<EnneagramTest />} />
          <Route path="/test/16-personality-test" element={<SixteenPersonalityTest />} />
          <Route path="/test/moral-alignment-test" element={<MoralAlignmentTest />} />
          <Route path="/test/introvert-extrovert-test" element={<IntrovertExtrovertTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
