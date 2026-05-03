'use client';

import { motion } from 'framer-motion';
import { BookOpen, Zap, TrendingUp, Award, GraduationCap, Sparkles } from 'lucide-react';
import { CourseCard } from '../shared/CourseCard';
import type { CourseWithProgress, UserStats } from '../../lib/types/course';

interface CoursesClientWrapperProps {
  enrolledCourses: CourseWithProgress[];
  availableCourses: CourseWithProgress[];
  stats: UserStats;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
};

const statCards = (stats: UserStats) => [
  {
    label: 'קורסים פעילים',
    value: stats.activeCoursesCount,
    icon: GraduationCap,
    color: '#7b6ef6',
    glow: 'rgba(123,110,246,0.3)',
    bg: 'linear-gradient(135deg, rgba(123,110,246,0.18), rgba(74,59,196,0.08))',
    border: 'rgba(123,110,246,0.35)',
  },
  {
    label: 'שיעורים הושלמו',
    value: stats.totalLessonsCompleted,
    icon: Award,
    color: '#0dbdb8',
    glow: 'rgba(13,189,184,0.25)',
    bg: 'linear-gradient(135deg, rgba(13,189,184,0.18), rgba(13,189,184,0.06))',
    border: 'rgba(13,189,184,0.35)',
  },
  {
    label: 'ממוצע התקדמות',
    value: `${stats.avgProgress}%`,
    icon: TrendingUp,
    color: '#f5a623',
    glow: 'rgba(245,166,35,0.28)',
    bg: 'linear-gradient(135deg, rgba(245,166,35,0.18), rgba(245,166,35,0.06))',
    border: 'rgba(245,166,35,0.35)',
  },
];

export function CoursesClientWrapper({ enrolledCourses, availableCourses, stats }: CoursesClientWrapperProps) {
  const isEmpty = enrolledCourses.length === 0 && availableCourses.length === 0;

  return (
    <div className="min-h-screen bg-mesh-subtle">
      <div className="container-mobile py-6 pb-10">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38 }}
          className="mb-7"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(123,110,246,0.25), rgba(74,59,196,0.12))', border: '1px solid rgba(123,110,246,0.4)', boxShadow: '0 4px 16px rgba(123,110,246,0.25)' }}>
              <BookOpen className="w-5 h-5 text-primary-300" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white leading-tight">הקורסים שלי</h1>
              <p className="text-slate-400 text-sm mt-0.5">המשיכו ללמוד והתקדמו ליעדים שלכם</p>
            </div>
          </div>
          <div className="h-px mt-4" style={{ background: 'linear-gradient(to left, transparent, rgba(123,110,246,0.5), rgba(74,59,196,0.25), transparent)' }} />
        </motion.div>

        {/* ── Stats Row ── */}
        {enrolledCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.38 }}
            className="grid grid-cols-3 gap-2.5 mb-8"
          >
            {statCards(stats).map((s) => (
              <div
                key={s.label}
                className="relative overflow-hidden rounded-2xl p-3 text-center"
                style={{ background: s.bg, border: `1px solid ${s.border}`, boxShadow: `0 4px 20px ${s.glow}` }}
              >
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
                <div className="w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center"
                  style={{ background: `${s.color}22`, boxShadow: `0 0 12px ${s.glow}` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <p className="text-xl font-black leading-none" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Enrolled Courses ── */}
        {enrolledCourses.length > 0 && (
          <section className="mb-9">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18, duration: 0.3 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-1.5 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #c4b5fd, #4a3bc4)' }} />
              <div className="flex items-center gap-2.5 flex-1">
                <Zap className="w-4.5 h-4.5 text-primary-400" />
                <h2 className="text-lg font-black text-white">בלמידה</h2>
                <span className="badge-primary text-xs font-bold px-2.5">{enrolledCourses.length} קורסים</span>
              </div>
            </motion.div>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              {enrolledCourses.map((course) => (
                <motion.div key={course.id} variants={item}>
                  <CourseCard course={course} progress={course.progress} isEnrolled={true} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* ── Divider between sections ── */}
        {enrolledCourses.length > 0 && availableCourses.length > 0 && (
          <div className="h-px mb-9" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
        )}

        {/* ── Available Courses ── */}
        {availableCourses.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: enrolledCourses.length > 0 ? 0.28 : 0.18, duration: 0.3 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-1.5 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #a855f7, #6366f1)' }} />
              <div className="flex items-center gap-2.5 flex-1">
                <Sparkles className="w-4.5 h-4.5 text-purple-400" />
                <h2 className="text-lg font-black text-white">קורסים זמינים</h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(168,85,247,0.18)', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' }}>
                  {availableCourses.length} זמינים
                </span>
              </div>
            </motion.div>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              {availableCourses.map((course) => (
                <motion.div key={course.id} variants={item}>
                  <CourseCard course={course} progress={0} isEnrolled={false} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* ── Empty State ── */}
        {isEmpty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, rgba(123,110,246,0.15), rgba(74,59,196,0.08))', border: '1px solid rgba(123,110,246,0.3)', boxShadow: '0 8px 32px rgba(123,110,246,0.2)' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-primary-400" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-white mb-2">אין קורסים עדיין</h3>
            <p className="text-slate-400 text-sm max-w-[220px] mx-auto leading-relaxed">
              המנהל יפתח עבורך גישה לקורסים בקרוב
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
