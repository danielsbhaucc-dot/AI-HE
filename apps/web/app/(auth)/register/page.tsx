'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Sparkles, CheckCircle } from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();
      
      // Register user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (authError) {
        setError(authError.message === 'User already registered' 
          ? 'כתובת האימייל כבר רשומה' 
          : 'שגיאה בהרשמה, נסו שוב');
        return;
      }

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase.from('profiles').insert({
          id: authData.user.id,
          full_name: fullName,
          role: 'user',
        });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        setSuccess(true);
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/courses');
          router.refresh();
        }, 2000);
      }
    } catch {
      setError('משהו השתבש, נסו שוב');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex flex-col justify-center px-4" style={{background: 'linear-gradient(135deg, #0f172a, #0d1f2d)'}}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto w-full text-center"
        >
          <div className="rounded-3xl p-12" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)'}}>
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-3">ההרשמה הושלמה!</h2>
            <p className="text-slate-400">מעבירים אתכם לקורסים שלכם...</p>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-center px-4 py-12" style={{background: 'linear-gradient(135deg, #0f172a 0%, #0d1f2d 50%, #0a1628 100%)'}}>
      {/* Background glow */}
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
          <h1 className="text-3xl font-black text-white">צרו חשבון חדש 🚀</h1>
          <p className="text-slate-400 mt-2">התחילו את המסע לחיים בריאים יותר</p>
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
              <label className="block text-sm font-semibold text-slate-300 mb-2">שם מלא 👤</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-5 py-4 pr-12 rounded-2xl text-white placeholder-slate-500 outline-none transition-all"
                  style={{background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.12)'}}
                  placeholder="ישראל ישראלי"
                />
              </div>
            </div>

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
              <label className="block text-sm font-semibold text-slate-300 mb-2">סיסמא 🔒</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-5 py-4 pr-12 pl-12 rounded-2xl text-white placeholder-slate-500 outline-none transition-all"
                  style={{background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.12)'}}
                  placeholder="לפחות 6 תווים"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-[1.02] active:scale-95 mt-2"
              style={{background: 'linear-gradient(135deg, #14b8a6, #10b981)', boxShadow: '0 10px 30px rgba(20,184,166,0.4)'}}>
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  הרשמה
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              כבר יש לכם חשבון?{' '}
              <Link href="/login" className="text-primary-400 font-bold hover:text-primary-300 transition-colors">
                התחברו 🔑
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            חזרה לדף הבית
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
