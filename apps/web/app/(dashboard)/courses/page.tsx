import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CourseCard } from '@/components/shared/CourseCard';
import { BookOpen } from 'lucide-react';

export default async function CoursesPage() {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Get user's enrollments with course data
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      course:courses(*, lessons(id))
    `)
    .eq('user_id', user.id)
    .eq('is_active', true);

  // Get all published courses (for discovery)
  const { data: allCourses } = await supabase
    .from('courses')
    .select('*, lessons(id)')
    .eq('is_published', true);

  const enrolledCourseIds = enrollments?.map(e => e.course_id) || [];
  
  const enrolledCourses = enrollments?.map(e => ({
    ...e.course,
    progress: Math.floor(Math.random() * 100), // TODO: Calculate real progress
    isEnrolled: true,
  })) || [];

  const availableCourses = allCourses
    ?.filter(c => !enrolledCourseIds.includes(c.id))
    .map(c => ({
      ...c,
      progress: 0,
      isEnrolled: false,
    })) || [];

  return (
    <div className="container-mobile py-6">
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        הקורסים שלי 📚
      </h1>
      <p className="text-text-secondary mb-6">
        המשיכו ללמוד והתקדמו ליעדים שלכם
      </p>

      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-500" />
            בלמידה
          </h2>
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={course.progress}
                isEnrolled={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Available Courses */}
      {availableCourses.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            קורסים זמינים 🎯
          </h2>
          <div className="space-y-4">
            {availableCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={0}
                isEnrolled={false}
              />
            ))}
          </div>
        </section>
      )}

      {enrolledCourses.length === 0 && availableCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">
            אין קורסים עדיין
          </h3>
          <p className="text-text-secondary">
            הצטרפו לקורס ראשון כדי להתחיל!
          </p>
        </div>
      )}
    </div>
  );
}
