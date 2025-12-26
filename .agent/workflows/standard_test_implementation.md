---
description: Guide for implementing standardized test UI components
---

# Standard Test Implementation Guide

This workflow defines the standard structure and rules that MUST be followed when creating or modifying any test/quiz implementation in the application.

## 1. Core UI Rules

### Header & Identity
- **Test Title**: Every test screen MUST display the test title clearly at the top (e.g., `<h1>K-Pop Demon Hunter Character Test</h1>`).
- **Progress Bar**: Display a progress bar showing the current question index relative to the total questions (e.g., `Question 5 / 20`).
- **Consistent Icons**: Use the specific icon assigned to the test (from `default_icons` or customized) instead of generic category icons.

### Interaction & Feedback
- **Transition Lock (Anti-Double-Click)**:
  - You MUST implement a state lock (e.g., `isTransitioning`) to prevent users from double-clicking an option and skipping questions or submitting duplicate answers.
  - Disable buttons while `isTransitioning` is true.
  - Add a small delay (e.g., 250ms) before moving to the next question to give users visual confirmation of their selection.
- **Loading State**:
  - Display a "Loading" or "Analyzing" screen for at least 3 seconds after the last question is answered. This builds anticipation and simulates complex calculation.
  - Use animations (spinners, pulsing icons) during this phase.

### Result Page Standards
- **Standard Action Buttons**: Every result page MUST provide exactly 4 action buttons to maximize engagement:
  1. **Share Test**: Share the main test landing page link.
  2. **Share Result**: Share the unique result link.
  3. **Retake**: Restart the quiz from the beginning.
  4. **Home**: Link back to the home page.
- **Open Graph (OG) Content**:
  - Every test page MUST include dynamic OG tags to ensure beautiful previews when shared on KakaoTalk, Telegram, or Twitter.
  - Required tags: `og:title`, `og:description`, `og:image` (test-specific image), and `og:url`.

## 2. Technical Implementation Pattern (React/Next.js)

```tsx
export default function QuizUI({ onFinish }) {
    // 1. Core State
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    
    // 2. Safety Locks
    const [isTransitioning, setIsTransitioning] = useState(false); // Prevents double submission
    const [isAnalyzing, setIsAnalyzing] = useState(false); // Shows analyzing screen

    const handleAnswer = (idx: number) => {
        // GUARD: Prevent interaction if already processing
        if (isTransitioning || isAnalyzing) return;

        setIsTransitioning(true);
        const newAnswers = [...answers, idx];
        setAnswers(newAnswers);

        // DELAY: Visual feedback
        setTimeout(() => {
            if (step < QUESTIONS.length - 1) {
                setStep(step + 1);
                window.scrollTo(0, 0); // Always scroll to top
                setIsTransitioning(false); // UNLOCK
            } else {
                // FINISH: Show analyzing screen
                setIsAnalyzing(true);
                setTimeout(() => {
                    onFinish(newAnswers.join(''));
                }, 3000);
            }
        }, 250);
    };

    // 3. Analyzing View
    if (isAnalyzing) {
        return <AnalyzingView />;
    }

    // 4. Question View
    return (
        <div className="container">
             {/* Rule: Always visible Title */}
            <h1>Test Title</h1>
            
            {/* Rule: Progress Bar */}
            <ProgressBar step={step} total={QUESTIONS.length} />

            {/* Questions */}
            <h2 key={step} className="animate-slide-in">{QUESTIONS[step].text}</h2>
            
            {QUESTIONS[step].options.map((opt, i) => (
                <button 
                    key={i} 
                    onClick={() => handleAnswer(i)}
                    disabled={isTransitioning} // Rule: Disable during transition
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}
```

## 3. Aesthetic Guidelines
- **Animations**: Use `animate-in`, `slide-in-from-right`, and `fade-in` to make question transitions smooth.
- **Typography**: Use standard Tailwind classes (e.g., `text-slate-900` for headings, `text-slate-500` for secondary text).
- **Haptic/Touch**: Ensure buttons have active states (`active:scale-[0.98]`) for tactile feedback on mobile.

## 4. Checklist for New Tests
- [ ] Is the Test Title visible?
- [ ] Is there a Progress Bar?
- [ ] Is Double-Click prevention implemented?
- [ ] Is there an Analyzing/Loading screen at the end?
- [ ] Are animations used for question transitions?
- [ ] Result Page: Are there exactly 4 action buttons (Share, Copy, Retake, More)?
- [ ] SEO: Are OG tags (title, desc, image) properly configured for sharing?
