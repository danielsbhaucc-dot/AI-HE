'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';
import { NuraWellLogo } from '../../../components/shared/NuraWellLogo';
import { useToast, ToastContainer } from '../../../components/shared/Toast';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast.error('אימייל לא תקין', 'יש להזין כתובת אימייל עם @');
      return;
    }
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });

      if (authError) {
        toast.error(
          'הרשמה נכשלה',
          authError.message === 'User already registered'
            ? 'כתובת האימייל כבר רשומה במערכת'
            : 'שגיאה בהרשמה, נסו שוב'
        );
        return;
      }

      if (authData.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from('profiles') as any).insert({
          id: authData.user.id,
          full_name: fullName,
          role: 'user',
        });

        toast.success('ברוכים הבאים!', 'החשבון נוצר בהצלחה — מעבירים אותך...');
        setTimeout(() => {
          router.push('/courses');
          router.refresh();
        }, 1200);
      }
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
        {/* Deep glass background layers */}
        <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -5%, rgba(20,184,166,0.09) 0%, transparent 50%)' }} />
        <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.05) 0%, transparent 45%)' }} />
        <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 10% 90%, rgba(99,102,241,0.04) 0%, transparent 40%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="max-w-md mx-auto w-full relative z-10"
        >
          {/* ── Header ── */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <NuraWellLogo size="lg" showTagline />
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to left, rgba(20,184,166,0.5), transparent)' }} />
              <span className="text-slate-300 text-base font-semibold">הרשמה חינמית</span>
              <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to right, rgba(20,184,166,0.5), transparent)' }} />
            </div>
            <p className="text-slate-400 text-sm mt-2">התחילו את המסע לחיים בריאים יותר</p>
          </div>

          {/* ── Form Card ── */}
          <div className="rounded-3xl p-8" style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(to bottom, #14FFEC, #10b981)' }} />
              <h2 className="text-white font-bold text-xl" style={{ fontFamily: 'Rubik, Heebo, sans-serif' }}>יצירת חשבון</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-bold text-slate-200 mb-2">
                  <User className="w-4 h-4 text-primary-400" />
                  שם מלא
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-2xl text-white placeholder-slate-500 outline-none transition-all text-sm"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.10)' }}
                  placeholder="ישראל ישראלי"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-bold text-slate-200 mb-2">
                  <Mail className="w-4 h-4 text-primary-400" />
                  כתובת אימייל
                </label>
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

              <div>
                <label className="flex items-center gap-1.5 text-sm font-bold text-slate-200 mb-2">
                  <Lock className="w-4 h-4 text-primary-400" />
                  סיסמה
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    dir="ltr"
                    className="w-full px-4 py-3.5 pl-12 rounded-2xl text-white placeholder-slate-500 outline-none transition-all text-sm"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.10)' }}
                    placeholder="לפחות 6 תווים"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
                <button type="submit" disabled={isLoading}
                  className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #10b981)', boxShadow: '0 8px 24px rgba(20,184,166,0.3)' }}>
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      יצירת חשבון חינמי
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-5 text-center">
              <p className="text-slate-500 text-sm">
                כבר יש לכם חשבון?{' '}
                <Link href="/login" className="text-primary-400 font-bold hover:text-primary-300 transition-colors">
                  כניסה לחשבון
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
