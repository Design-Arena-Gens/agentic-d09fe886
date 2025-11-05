"use client";

import { useMemo, useState } from 'react';

type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
};

const QUIZ: QuizQuestion[] = [
  {
    id: 'age',
    prompt: 'Which age range best describes you?',
    options: ['Under 18', '18?24', '25?34', '35+'],
  },
  {
    id: 'style',
    prompt: 'What is your Fall/Winter style vibe?',
    options: ['Casual & Cozy', 'Sporty', 'Classic', 'Trendy'],
  },
  {
    id: 'shop',
    prompt: 'How often do you shop at Hollister?',
    options: ['Weekly', 'Monthly', 'A few times a year', 'Rarely'],
  },
  {
    id: 'priority',
    prompt: 'What matters most when choosing apparel?',
    options: ['Fit & Comfort', 'Price', 'Quality', 'Sustainability'],
  },
  {
    id: 'notify',
    prompt: 'Would you like early access to seasonal drops?',
    options: ['Yes, keep me posted', 'Maybe later', 'No thanks'],
  },
];

function ProgressBar({ progressPercent }: { progressPercent: number }) {
  const width = Math.max(0, Math.min(100, progressPercent));
  return (
    <div className="progress" aria-label="progress">
      <div className="progressFill" style={{ width: `${width}%` }} />
    </div>
  );
}

function HollisterWordmark() {
  return (
    <svg viewBox="0 0 420 60" role="img" aria-label="Hollister" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="system-ui, -apple-system, 'Segoe UI', Arial, Helvetica, sans-serif" fontSize="36" fontWeight="700" fill="#292a33" letterSpacing="3">HOLLISTER</text>
    </svg>
  );
}

export default function Page() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const total = QUIZ.length;
  const current = QUIZ[index];
  const progress = useMemo(() => Math.round(((index) / total) * 100), [index, total]);

  const onAnswer = (choice: string) => {
    const nextAnswers = { ...answers, [current.id]: choice };
    setAnswers(nextAnswers);
    if (index < total - 1) {
      setIndex(index + 1);
    } else {
      // Completed
      setIndex(index + 1);
    }
  };

  const isDone = index >= total;

  return (
    <div>
      <div className="banner">?? 2025 Fall/Winter Feedback Program ? Limited Time ??</div>
      <main className="container">
        <div className="logo" aria-hidden>
          <HollisterWordmark />
        </div>

        <ProgressBar progressPercent={isDone ? 100 : progress} />

        <div className="pillRow">
          <div className="pill" aria-label="Takes one to two minutes">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="#4e6f84" strokeWidth="1.5" />
              <path d="M12 7v5l3 2" stroke="#4e6f84" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="thin">Takes 1?2 minutes</span>
          </div>
        </div>

        {!isDone ? (
          <section>
            <h1 className="question">{current.prompt}</h1>
            <p className="subtle">Help us tailor the $500 Fall/Winter Program.</p>
            <div className="answers">
              {current.options.map((opt) => (
                <button
                  key={opt}
                  className="button"
                  onClick={() => onAnswer(opt)}
                  aria-label={opt}
                >
                  {opt}
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h1 className="question">You?re in. Thanks for your feedback!</h1>
            <p className="subtle">Your responses help shape our 2025 Fall/Winter collection.</p>
            <div className="answers">
              <a className="button" href="#" aria-label="Continue">Continue</a>
            </div>
          </section>
        )}

        <footer className="footer">
          <div className="footerRow">
            <div className="footerLinks">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </div>
            <div className="domain">? 2025 Hollister Co. ? agentic-d09fe886.vercel.app</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
