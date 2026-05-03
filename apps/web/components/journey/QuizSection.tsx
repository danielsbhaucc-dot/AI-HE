'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowLeft, HelpCircle, Sparkles } from 'lucide-react';
import type { QuizQuestion } from '../../lib/types/journey';

interface QuizSectionProps {
  questions: QuizQuestion[];
  existingAnswers: Record<string, number>;
  onComplete: (answers: Record<string, number>, score: number) => void;
}

export function QuizSection({ questions, existingAnswers, onComplete }: QuizSectionProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>(existingAnswers);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(Object.keys(existingAnswers).length === questions.length);

  const question = questions[currentQ];
  const isAnswered = selectedOption !== null || answers[question?.id] !== undefined;
  const currentAnswer = selectedOption ?? answers[question?.id];
  const isCorrect = currentAnswer === question?.correct_index;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setShowExplanation(true);
    const newAnswers = { ...answers, [question.id]: index };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      const score = questions.reduce((acc, q) => {
        return acc + (answers[q.id] === q.correct_index ? 1 : 0);
      }, 0);
      setIsComplete(true);
      onComplete(answers, score);
    }
  };

  if (isComplete) {
    const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct_index ? 1 : 0), 0);
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
          style={{ background: 'rgba(16,185,129,0.12)', border: '2px solid rgba(16,185,129,0.3)' }}>
          <Sparkles className="w-10 h-10 text-emerald-600" />
        </motion.div>
        <h2 className="text-2xl font-black mb-2" style={{ color: '#1A1730' }}>כל הכבוד! 🎉</h2>
        <p className="text-gray-500 text-lg mb-2">
          ענית נכון על <strong className="text-emerald-600">{score}</strong> מתוך <strong>{questions.length}</strong> שאלות
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {questions.map((q, i) => (
            <div key={q.id} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{
                background: answers[q.id] === q.correct_index ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.1)',
                color: answers[q.id] === q.correct_index ? '#059669' : '#dc2626',
                border: `1.5px solid ${answers[q.id] === q.correct_index ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.2)'}`,
              }}>
              {i + 1}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-6">ממשיכים אוטומטית לשלב הבא...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-700">שאלות הבנה</span>
        </div>
        <p className="text-sm text-gray-500">שאלה {currentQ + 1} מתוך {questions.length}</p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {questions.map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full transition-all"
            style={{
              background: i < currentQ ? '#10b981' : i === currentQ ? '#047857' : '#d1d5db',
              transform: i === currentQ ? 'scale(1.3)' : 'scale(1)',
            }} />
        ))}
      </div>

      {/* Question card — green header + white body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        >
          {/* Green gradient header */}
          <div className="px-5 py-4" style={{ background: 'linear-gradient(145deg, #047857, #059669, #10b981)' }}>
            <h3 className="text-lg font-black leading-snug text-white">
              {question.question}
            </h3>
          </div>

          {/* White body */}
          <div className="p-5 bg-white">
          <div className="space-y-2.5">
            {question.options.map((option, i) => {
              const isSelected = currentAnswer === i;
              const isCorrectAnswer = i === question.correct_index;
              const showResult = showExplanation;

              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className="w-full text-right p-4 rounded-xl font-medium text-[15px] transition-all flex items-center gap-3"
                  style={{
                    background: showResult && isCorrectAnswer
                      ? 'rgba(16,185,129,0.1)'
                      : showResult && isSelected && !isCorrectAnswer
                        ? 'rgba(239,68,68,0.08)'
                        : isSelected
                          ? 'rgba(16,185,129,0.06)'
                          : 'rgba(0,0,0,0.02)',
                    border: showResult && isCorrectAnswer
                      ? '1.5px solid rgba(16,185,129,0.5)'
                      : showResult && isSelected && !isCorrectAnswer
                        ? '1.5px solid rgba(239,68,68,0.3)'
                        : '1.5px solid rgba(0,0,0,0.06)',
                    color: '#1A1730',
                  }}
                >
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: showResult && isCorrectAnswer ? '#10b981' : showResult && isSelected ? '#ef4444' : 'rgba(0,0,0,0.06)',
                      color: (showResult && (isCorrectAnswer || isSelected)) ? '#fff' : '#6b7280',
                    }}>
                    {showResult && isCorrectAnswer ? <CheckCircle2 className="w-4 h-4" /> :
                     showResult && isSelected ? <XCircle className="w-4 h-4" /> :
                     String.fromCharCode(1488 + i) /* א ב ג ד */}
                  </span>
                  <span className="flex-1">{option}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 rounded-xl"
                style={{
                  background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
                  border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                }}>
                <p className="text-sm font-bold mb-1" style={{ color: isCorrect ? '#059669' : '#d97706' }}>
                  {isCorrect ? '✓ תשובה נכונה!' : '✗ לא בדיוק...'}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{question.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
          </div>{/* end white body */}
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      {isAnswered && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
          style={{ background: 'linear-gradient(135deg, #047857, #10b981)', boxShadow: '0 6px 20px rgba(16,185,129,0.3)' }}>
          <span>{currentQ < questions.length - 1 ? 'שאלה הבאה' : 'סיום השאלות'}</span>
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}
