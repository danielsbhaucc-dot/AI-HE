'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, CheckCircle2, Lock } from 'lucide-react';

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
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link
        href={`/courses/${course.id}`}
        className="card-premium block overflow-hidden no-tap-highlight"
        style={{ padding: 0 }}
      >
        {/* Thumbnail */}
        <div className="relative w-full overflow-hidden rounded-t-3xl" style={{ aspectRatio: '16/9' }}>
          {course.thumbnail_url ? (
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0f766e, #065f46)' }}
            >
              <BookOpen className="w-14 h-14 text-primary-300/50" />
            </div>
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Play button */}
          {isEnrolled && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.35)' }}
              >
                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
              </div>
            </div>
          )}

          {/* Top badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {isCompleted && (
              <span className="badge-success">✅ הושלם</span>
            )}
            {course.is_premium && (
              <span className="badge-accent">⭐ פרימיום</span>
            )}
            {!isEnrolled && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-300"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
              >
                <Lock className="w-3 h-3" /> נעול
              </span>
            )}
          </div>

          {/* Progress badge bottom-left */}
          {isEnrolled && progress > 0 && !isCompleted && (
            <div
              className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: 'rgba(20,184,166,0.85)', backdropFilter: 'blur(8px)' }}
            >
              {progress}%
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-base font-bold text-white line-clamp-1 mb-1">
              {course.title}
            </h3>
            {course.description && (
              <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                {course.description}
              </p>
            )}
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-primary-400" />
              <span>{lessonCount} שיעורים</span>
            </div>
            <span className="text-slate-700">·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary-400" />
              <span>~{lessonCount * 15} דקות</span>
            </div>
            {isEnrolled && (
              <>
                <span className="text-slate-700">·</span>
                <div className="flex items-center gap-1 text-primary-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-medium">רשום</span>
                </div>
              </>
            )}
          </div>

          {/* Progress bar */}
          {isEnrolled && (
            <div>
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-600">התקדמות</span>
                <span className="text-xs font-bold text-primary-400">{progress}%</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
