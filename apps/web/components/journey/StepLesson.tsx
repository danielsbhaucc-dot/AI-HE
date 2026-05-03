'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { JourneyStep, JourneyStepProgress, StepSection } from '../../lib/types/journey';
import { VideoSection } from './VideoSection';
import { QuizSection } from './QuizSection';
import { MiniGame } from './MiniGame';
import { CommitmentSection } from './CommitmentSection';
import { SummarySection } from './SummarySection';
import { StepProgress } from './StepProgress';

interface StepLessonProps {
  step: JourneyStep;
  initialProgress: JourneyStepProgress;
  userId: string;
}

const SECTIONS: StepSection[] = ['video', 'quiz', 'game', 'commitment', 'summary'];

async function saveJourneyProgress(
  userId: string,
  stepId: string,
  update: Partial<JourneyStepProgress>
): Promise<void> {
  await fetch('/api/v1/journey-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ step_id: stepId, ...update }),
  });
}

export function StepLesson({ step, initialProgress, userId }: StepLessonProps) {
  const [progress, setProgress] = useState<JourneyStepProgress>(initialProgress);
  const [currentSection, setCurrentSection] = useState<StepSection>(initialProgress.last_section || 'video');
  const [direction, setDirection] = useState(1);

  const currentIndex = SECTIONS.indexOf(currentSection);
  const isLastSection = currentIndex === SECTIONS.length - 1;

  const updateProgress = useCallback(async (update: Partial<JourneyStepProgress>) => {
    const newProgress = { ...progress, ...update };
    setProgress(newProgress);
    await saveJourneyProgress(userId, step.id, update);
  }, [progress, userId, step.id]);

  const goToSection = useCallback((section: StepSection) => {
    const newIndex = SECTIONS.indexOf(section);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentSection(section);
    updateProgress({ last_section: section });
  }, [currentIndex, updateProgress]);

  const goNext = useCallback(() => {
    if (!isLastSection) {
      const nextSection = SECTIONS[currentIndex + 1];
      goToSection(nextSection);
    }
  }, [currentIndex, isLastSection, goToSection]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      const prevSection = SECTIONS[currentIndex - 1];
      goToSection(prevSection);
    }
  }, [currentIndex, goToSection]);

  const handleVideoComplete = useCallback(() => {
    updateProgress({ video_watched: true });
    goNext();
  }, [updateProgress, goNext]);

  const handleQuizComplete = useCallback((answers: Record<string, number>, score: number) => {
    updateProgress({ quiz_answers: answers, quiz_score: score });
    goNext();
  }, [updateProgress, goNext]);

  const handleGameComplete = useCallback((answers: Record<string, boolean>, score: number) => {
    updateProgress({ game_answers: answers, game_score: score });
    goNext();
  }, [updateProgress, goNext]);

  const handleCommitmentAccept = useCallback(() => {
    updateProgress({ commitment_accepted: true });
    goNext();
  }, [updateProgress, goNext]);

  const handleLessonComplete = useCallback(() => {
    updateProgress({ is_completed: true, completed_at: new Date().toISOString() });
  }, [updateProgress]);

  const handleReplay = useCallback(() => {
    goToSection('video');
  }, [goToSection]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen" style={{ background: '#EDF5F0' }}>
      {/* Header */}
      <div className="-mt-16 pt-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #064e3b 0%, #047857 50%, #10b981 100%)' }}>
        <div className="relative z-10 px-4 pb-8 pt-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={goBack} disabled={currentIndex === 0}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <div className="text-center flex-1 px-3">
              <p className="text-white/70 text-xs font-medium">צעד {step.step_number}</p>
              <h1 className="text-white text-lg font-black leading-tight truncate" style={{ fontFamily: "'Rubik','Heebo',sans-serif" }}>
                {step.title}
              </h1>
            </div>
            <button onClick={goNext} disabled={isLastSection}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
          </div>

          <StepProgress sections={SECTIONS} currentSection={currentSection} progress={progress} onSectionClick={goToSection} />
        </div>
      </div>

      {/* Content */}
      <div style={{ borderRadius: '26px 26px 0 0', marginTop: '-14px', position: 'relative', zIndex: 3 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSection}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="px-4 py-6"
          >
            {currentSection === 'video' && (
              <VideoSection
                provider={step.video_provider}
                externalId={step.video_external_id}
                externalUrl={step.video_external_url}
                title={step.video_title || step.title}
                onComplete={handleVideoComplete}
                isWatched={progress.video_watched}
              />
            )}
            {currentSection === 'quiz' && (
              <QuizSection
                questions={step.quiz_questions}
                existingAnswers={progress.quiz_answers}
                onComplete={handleQuizComplete}
              />
            )}
            {currentSection === 'game' && (
              <MiniGame
                items={step.game_items}
                existingAnswers={progress.game_answers}
                onComplete={handleGameComplete}
              />
            )}
            {currentSection === 'commitment' && step.commitment && (
              <CommitmentSection
                commitment={step.commitment}
                isAccepted={progress.commitment_accepted}
                onAccept={handleCommitmentAccept}
              />
            )}
            {currentSection === 'summary' && (
              <SummarySection
                step={step}
                progress={progress}
                onReplay={handleReplay}
                onComplete={handleLessonComplete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
