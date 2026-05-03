import type { Metadata } from 'next';
import { createClient } from '../../../../lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { StepLesson } from '../../../../components/journey/StepLesson';
import type { JourneyStep, JourneyStepProgress } from '../../../../lib/types/journey';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ stepId: string }> }): Promise<Metadata> {
  const { stepId } = await params;
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from('journey_steps')
    .select('title')
    .eq('id', stepId)
    .single();

  return { title: data?.title || 'שיעור' };
}

export default async function StepPage({ params }: { params: Promise<{ stepId: string }> }) {
  const { stepId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: step } = await (supabase as any)
    .from('journey_steps')
    .select('*')
    .eq('id', stepId)
    .single();

  if (!step) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: progress } = await (supabase as any)
    .from('journey_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('step_id', stepId)
    .single();

  const initialProgress: JourneyStepProgress = progress || {
    step_id: stepId,
    user_id: user.id,
    video_watched: false,
    quiz_answers: {},
    quiz_score: null,
    game_answers: {},
    game_score: null,
    commitment_accepted: false,
    tasks_completed: {},
    habits_progress: {},
    is_completed: false,
    completed_at: null,
    last_section: 'video',
  };

  return <StepLesson step={step as JourneyStep} initialProgress={initialProgress} userId={user.id} />;
}
