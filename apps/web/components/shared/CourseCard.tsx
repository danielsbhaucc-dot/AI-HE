'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/cn';

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
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card-premium overflow-hidden"
    >
      <Link href={`/courses/${course.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary-100 to-secondary-100">
          {course.thumbnail_url ? (
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary-300" />
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-primary-600 mr-1" fill="currentColor" />
            </div>
          </div>
          
          {/* Progress Badge */}
          {isEnrolled && progress > 0 && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-primary-600 shadow-sm">
              {progress}%
            </div>
          )}
          
          {/* Premium Badge */}
          {course.is_premium && !isEnrolled && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-secondary-500 to-primary-500 text-white text-sm font-medium shadow-sm">
              ⭐ פרימיום
            </div>
          )}
          
          {/* Completed Badge */}
          {isEnrolled && progress === 100 && (
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-success-DEFAULT flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-text-primary line-clamp-1">
            {course.title}
          </h3>
          
          {course.description && (
            <p className="text-sm text-text-secondary line-clamp-2">
              {course.description}
            </p>
          )}
          
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-text-muted pt-2">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{lessonCount} שיעורים</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>~{lessonCount * 15} דקות</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          {isEnrolled && progress > 0 && (
            <div className="pt-2">
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
