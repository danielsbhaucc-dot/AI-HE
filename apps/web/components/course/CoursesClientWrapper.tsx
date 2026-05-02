'use client';

import { motion } from 'framer-motion';
import { BookOpen, Zap, TrendingUp, Award } from 'lucide-react';
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
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function CoursesClientWrapper({ enrolledCourses, availableCourses, stats }: CoursesClientWrapperProps) {
  const isEmpty = enrolledCourses.length === 0 && availableCourses.length === 0;

  return (
    <div className="min-h-screen bg-mesh-subtle">
      <div className="container-mobile py-6 pb-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-black text-white mb-1">
            הקורסים שלי 📚
          </h1>
          <p className="text-slate-400 text-sm">המשיכו ללמוד והתקדמו ליעדים שלכם</p>
        </motion.div>

        {/* Stats Row */}
        {enrolledCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {[
              { label: 'קורסים פעילים', value: stats.activeCoursesCount, icon: BookOpen, color: '#14b8a6' },
              { label: 'שיעורים הושלמו', value: stats.totalLessonsCompleted, icon: Award, color: '#10b981' },
              { label: 'ממוצע התקדמות', value: `${stats.avgProgress}%`, icon: TrendingUp, color: '#d946ef' },
            ].map((s) => (
              <div
                key={s.label}
                className="glass-card p-3 text-center"
              >
                <div className="w-8 h-8 rounded-xl mx-auto mb-1.5 flex items-center justify-center"
                  style={{ background: `${s.color}22`, border: `1px solid ${s.color}44` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <p className="text-lg font-black text-white leading-none">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Enrolled Courses */}
        {enrolledCourses.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(20,184,166,0.2)', border: '1px solid rgba(20,184,166,0.3)' }}>
                <Zap className="w-4 h-4 text-primary-400" />
              </div>
              <h2 className="text-base font-bold text-white">בלמידה</h2>
              <span className="badge-primary text-xs">{enrolledCourses.length}</span>
            </div>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              {enrolledCourses.map((course) => (
                <motion.div key={course.id} variants={item}>
                  <CourseCard course={course} progress={course.progress} isEnrolled={true} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* Available Courses */}
        {availableCourses.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <BookOpen className="w-4 h-4 text-secondary-400" />
              </div>
              <h2 className="text-base font-bold text-white">קורסים זמינים 🎯</h2>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {availableCourses.map((course) => (
                <motion.div key={course.id} variants={item}>
                  <CourseCard course={course} progress={0} isEnrolled={false} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* Empty State */}
        {isEmpty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center text-4xl"
              style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
              📚
            </div>
            <h3 className="text-xl font-bold text-white mb-2">אין קורסים עדיין</h3>
            <p className="text-slate-400 text-sm">
              המנהל יפתח עבורך גישה לקורסים בקרוב ✨
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
