'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, CheckCircle2, Lock, Crown } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string | null;
    thumbnail_url: string | null;
    lessons: { id: string }[];
    is_premium: boolean;
  };
  progress: number;
  isEnrolled: boolean;
}

export function CourseCard({ course, progress, isEnrolled }: CourseCardProps) {
  const lessonCount = course.lessons?.length || 0;
  const isCompleted = isEnrolled && progress === 100;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.012 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
    >
      <Link
        href={`/courses/${course.id}`}
        className="block overflow-hidden no-tap-highlight rounded-3xl relative"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
          transition: 'all 0.25s ease',
        }}
      >
        {/* Top color accent line */}
        <div className="absolute inset-x-0 top-0 h-px z-10"
          style={{ background: isCompleted
            ? 'linear-gradient(90deg, transparent, #10b981, #34d399, transparent)'
            : isEnrolled
            ? 'linear-gradient(90deg, transparent, #7b6ef6, #a99df8, transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
          }} />

        {/* Thumbnail */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {course.thumbnail_url ? (
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1e1260 0%, #3730a3 50%, #2d1b8e 100%)' }}>
              <BookOpen className="w-16 h-16" style={{ color: 'rgba(169,157,248,0.45)' }} />
            </div>
          )}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {!course.thumbnail_url && (
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(123,110,246,0.14), transparent 60%)' }} />
          )}

          {/* Play button */}
          {isEnrolled && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.4)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                <Play className="w-5 h-5 text-white" style={{ marginRight: '-2px' }} fill="white" />
              </div>
            </div>
          )}

          {/* Top badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            {isCompleted && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(16,185,129,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(16,185,129,0.5)', color: '#ecfdf5' }}>
                <CheckCircle2 className="w-3 h-3" /> הושלם
              </span>
            )}
            {course.is_premium && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(168,85,247,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(168,85,247,0.5)', color: '#faf5ff' }}>
                <Crown className="w-3 h-3" /> פרימיום
              </span>
            )}
            {!isEnrolled && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-200"
                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <Lock className="w-3 h-3" /> נעול
              </span>
            )}
          </div>

          {/* Progress badge */}
          {isEnrolled && progress > 0 && !isCompleted && (
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-black text-white z-10"
              style={{ background: 'rgba(123,110,246,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 8px rgba(123,110,246,0.5)' }}>
              {progress}%
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-base font-black text-white line-clamp-1 mb-1 leading-snug">
              {course.title}
            </h3>
            {course.description && (
              <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                {course.description}
              </p>
            )}
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <BookOpen className="w-3.5 h-3.5 text-primary-400" />
              <span>{lessonCount} שיעורים</span>
            </div>
            <div className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-primary-400" />
              <span>~{lessonCount * 15} דקות</span>
            </div>
            {isEnrolled && (
              <>
                <div className="w-px h-3 bg-slate-700" />
                <div className="flex items-center gap-1 text-primary-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-semibold">רשום</span>
                </div>
              </>
            )}
          </div>

          {/* Progress bar */}
          {isEnrolled && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-slate-500 font-medium">התקדמות</span>
                <span className="text-xs font-black" style={{ color: isCompleted ? '#34d399' : '#a99df8' }}>{progress}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                  style={{ background: isCompleted
                    ? 'linear-gradient(90deg, #059669, #10b981, #34d399)'
                    : 'linear-gradient(90deg, #4a3bc4, #7b6ef6, #a99df8)',
                    boxShadow: isCompleted ? '0 0 8px rgba(16,185,129,0.5)' : '0 0 8px rgba(123,110,246,0.5)' }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
