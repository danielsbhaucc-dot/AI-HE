'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Sparkles, Flame, ArrowLeft } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-mesh overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20 pb-32">
        {/* Background Decorations - Teal/Green */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-10 w-96 h-96 bg-secondary-300/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="container-mobile relative z-10 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm"
              style={{background: 'rgba(20,184,166,0.2)', border: '1px solid rgba(20,184,166,0.4)', color: '#5eead4'}}>
              <Sparkles className="w-4 h-4" />
              מופעל ב-AI ✨
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span style={{background: 'linear-gradient(135deg, #5eead4, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              הדרך החכמה
            </span>
            <br />
            <span className="text-white">לירידה במשקל</span>
          </motion.h1>

          {/* Subtitle in Glass Card */}
          <motion.div
            variants={itemVariants}
            className="mb-10 max-w-md mx-auto"
          >
            <div className="rounded-2xl px-6 py-4" style={{background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)'}}>
              <p className="text-white text-base md:text-lg leading-relaxed font-medium">
                קורסים אינטראקטיביים עם מעקב התקדמות חכם, משימות יומיות והרגלים בריאים 🌿
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-12 max-w-sm mx-auto sm:max-w-none"
          >
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-105 active:scale-95"
              style={{background: 'linear-gradient(135deg, #14b8a6, #10b981)', boxShadow: '0 8px 25px rgba(20,184,166,0.4)'}}
            >
              <Play className="w-5 h-5 flex-shrink-0" />
              <span>התחל עכשיו - חינם!</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105 active:scale-95"
              style={{background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)'}}
            >
              <span>כבר יש לי חשבון</span>
              <ArrowLeft className="w-5 h-5 flex-shrink-0" />
            </Link>
          </motion.div>

          {/* Stats - Glass Cards */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4"
          >
            {[
              { value: '95%', label: 'שביעות רצון', emoji: '⭐' },
              { value: '15kg', label: 'ממוצע ירידה', emoji: '🔥' },
              { value: '+500', label: 'סטודנטים', emoji: '🎓' },
            ].map((stat) => (
              <div key={stat.value}
                className="flex-1 max-w-[100px] text-center py-3 px-2 rounded-2xl"
                style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)'}}>
                <div className="text-xl font-black text-white mb-0.5">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.emoji} {stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-300 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4" style={{background: 'linear-gradient(180deg, #0f172a 0%, #0d1f2d 100%)'}}>
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-400 text-sm font-medium mb-4">הפיצ'רים שלנו</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              מה מחכה לך? 🌟
            </h2>
            <p className="text-slate-400 text-lg">
              מערכת שלמה שתלווה אותך בכל שלב
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-default"
                style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)'}}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{background: `linear-gradient(135deg, ${feature.color1}, ${feature.color2})`}}>
                    {feature.emoji}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{background: `linear-gradient(90deg, transparent, ${feature.color1}, transparent)`}} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4" style={{background: 'linear-gradient(180deg, #0d1f2d 0%, #0a1628 100%)'}}>
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-500/20 border border-secondary-500/30 text-secondary-400 text-sm font-medium mb-4">כיצד להתחיל</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              איך זה עובד? 🚀
            </h2>
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="flex items-center gap-5 p-5 rounded-3xl transition-all duration-300 hover:scale-[1.01]"
                style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)'}}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-lg"
                  style={{background: 'linear-gradient(135deg, #14b8a6, #10b981)'}}>
                  {step.number}
                </div>
                <div className="text-right flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.description}</p>
                </div>
                <div className="text-2xl">{step.emoji}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden" style={{background: 'linear-gradient(180deg, #0a1628 0%, #0f172a 100%)'}}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-20" style={{background: 'radial-gradient(circle, #14b8a6, transparent 70%)'}} />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center relative z-10"
        >
          <div className="rounded-3xl p-10 shadow-2xl" style={{background: 'linear-gradient(135deg, rgba(20,184,166,0.9), rgba(16,185,129,0.9))', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)'}}>
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              מוכנים להתחיל?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              הצטרפו עכשיו וקבלו גישה מלאה לכל הקורסים
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-primary-600 rounded-2xl font-black text-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-200"
            >
              <Flame className="w-6 h-6" />
              בואו נתחיל!
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 border-t border-slate-800">
        <div className="container-mobile text-center">
          <p className="text-text-muted text-sm">
            © 2024 מערכת קורסים לירידה במשקל. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </main>
  );
}

// Data
const features = [
  {
    emoji: '📚',
    title: 'קורסים מובנים',
    description: 'שיעורים בווידאו, אודיו, טקסט ומצגות - כל מה שצריך להצלחה',
    color1: '#14b8a6',
    color2: '#0d9488',
  },
  {
    emoji: '📊',
    title: 'מעקב התקדמות',
    description: 'עקבו אחרי ההתקדמות שלכם עם גרפים וסטטיסטיקות מפורטות',
    color1: '#6366f1',
    color2: '#4f46e5',
  },
  {
    emoji: '🔥',
    title: 'הרגלים יומיים',
    description: 'בנו הרגלים בריאים עם מערכת מטלות יומיות חכמה',
    color1: '#f97316',
    color2: '#ea580c',
  },
  {
    emoji: '🤖',
    title: 'AI ליווי אישי',
    description: 'קבלו המלצות חכמות מותאמות אישית לפרוגרס שלכם',
    color1: '#10b981',
    color2: '#059669',
  },
];

const steps = [
  {
    number: '1',
    emoji: '📝',
    title: 'הרשמה מהירה',
    description: 'צרו חשבון ב-30 שניות והתחילו מיד',
  },
  {
    number: '2',
    emoji: '🎯',
    title: 'בחירת קורס',
    description: 'בחרו מהקורסים הזמינים או קבלו המלצה מ-AI',
  },
  {
    number: '3',
    emoji: '📖',
    title: 'למידה ותרגול',
    description: 'צפו בשיעורים, השלימו משימות ובנו הרגלים',
  },
  {
    number: '4',
    emoji: '🏆',
    title: 'תוצאות מדהימות',
    description: 'עקבו אחרי ההתקדמות וחגגו הישגים!',
  },
];
