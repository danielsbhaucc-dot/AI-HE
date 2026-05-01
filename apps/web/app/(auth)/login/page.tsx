'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles } from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';

// Prevent static generation issues
export const dynamic = 'force-dynamic';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/courses';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('אימייל או סיסמה לא נכונים');
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError('משהו השתבש, נסו שוב');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center px-4 py-12" style={{background: 'linear-gradient(135deg, #0f172a 0%, #0d1f2d 50%, #0a1628 100%)'}}>
      <div className="fixed inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.15) 0%, transparent 60%)'}} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto w-full relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">ברוכים הבאים! 👋</h1>
          <p className="text-slate-400 mt-2">התחברו כדי להמשיך את המסע שלכם</p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl p-8" style={{background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)'}}>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">אימייל 📧</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 pr-12 rounded-2xl text-white placeholder-slate-500 outline-none transition-all"
                  style={{background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.12)'}}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">סיסמה 🔒</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 pr-12 pl-12 rounded-2xl text-white placeholder-slate-500 outline-none transition-all"
                  style={{background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.12)'}}
                  placeholder="******"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-[1.02] active:scale-95"
              style={{background: 'linear-gradient(135deg, #14b8a6, #10b981)', boxShadow: '0 10px 30px rgba(20,184,166,0.4)'}}>
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  התחברות
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              אין לכם חשבון?{' '}
              <Link href="/register" className="text-primary-400 font-bold hover:text-primary-300 transition-colors">
                הירשמו עכשיו 🚀
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            חזרה לדף הבית
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

// Wrapper with Suspense for useSearchParams
export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </main>
    }>
      <LoginFormContent />
    </Suspense>
  );
}
