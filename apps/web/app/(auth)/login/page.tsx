'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';
import { NuraWellLogo } from '../../../components/shared/NuraWellLogo';
import { useToast, ToastContainer } from '../../../components/shared/Toast';

export const dynamic = 'force-dynamic';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/courses';
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        toast.error('התחברות נכשלה', 'אימייל או סיסמה שגויים');
        return;
      }

      toast.success('התחברת בהצלחה!', 'מעבירים אותך לקורסים...');
      setTimeout(() => {
        router.push(redirect);
        router.refresh();
      }, 800);
    } catch {
      toast.error('שגיאה', 'משהו השתבש, נסו שוב');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />
      <main
        className="min-h-screen flex flex-col justify-center px-4 py-10"
        style={{ background: '#0c1523' }}
      >
        {/* Subtle top glow only */}
        <div className="fixed inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(20,184,166,0.08) 0%, transparent 55%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="max-w-md mx-auto w-full relative z-10"
        >
          {/* ── Header ── */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <NuraWellLogo size="lg" showTagline />
            </div>
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to left, rgba(20,184,166,0.5), transparent)' }} />
              <span className="text-slate-400 text-sm font-medium" style={{ fontFamily: 'Heebo, sans-serif' }}>
                ברוכים הבאים
              </span>
              <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to right, rgba(20,184,166,0.5), transparent)' }} />
            </div>
            <p className="text-slate-500 text-sm mt-2">התחברו כדי להמשיך את המסע שלכם</p>
          </div>

          {/* ── Form Card ── */}
          <div className="rounded-3xl p-8" style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            {/* Section title */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #14FFEC, #10b981)' }} />
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Rubik, Heebo, sans-serif' }}>כניסה לחשבון</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 mb-2">
                  <Mail className="w-3.5 h-3.5 text-primary-400" />
                  כתובת אימייל
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    dir="ltr"
                    className="w-full px-4 py-3.5 rounded-2xl text-white placeholder-slate-500 outline-none transition-all text-sm"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.10)' }}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 mb-2">
                  <Lock className="w-3.5 h-3.5 text-primary-400" />
                  סיסמה
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    dir="ltr"
                    className="w-full px-4 py-3.5 pl-12 rounded-2xl text-white placeholder-slate-500 outline-none transition-all text-sm"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.10)' }}
                    placeholder="••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Divider before CTA */}
              <div className="pt-1">
                <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
                <button type="submit" disabled={isLoading}
                  className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #10b981)', boxShadow: '0 8px 24px rgba(20,184,166,0.3)' }}>
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-4.5 h-4.5" />
                      כניסה לחשבון
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-5 text-center">
              <p className="text-slate-500 text-sm">
                אין לכם חשבון?{' '}
                <Link href="/register" className="text-primary-400 font-bold hover:text-primary-300 transition-colors">
                  הרשמה חינם
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0c1523] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </main>
    }>
      <LoginFormContent />
    </Suspense>
  );
}
