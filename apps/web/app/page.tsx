'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Sparkles, Target, Flame, Award, ArrowLeft } from 'lucide-react';

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
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-x-hidden">
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
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-primary-200">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-text-secondary">
                מופעל ב-AI ✨
              </span>
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient">הדרך החכמה</span>
            <br />
            <span className="text-text-primary">לירידה במשקל 🎯</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed"
          >
            קורסים אינטראקטיביים עם מעקב התקדמות חכם,
            <br />
            משימות יומיות והרגלים בריאים
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              href="/register"
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
            >
              <Play className="w-5 h-5" />
              התחל עכשיו - חינם!
            </Link>
            <Link
              href="/login"
              className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
            >
              יש לך חשבון? התחבר
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 md:gap-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-text-secondary">סטודנטים 🎓</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-500">15kg</div>
              <div className="text-sm text-text-secondary">ממוצע ירידה 🔥</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-DEFAULT">95%</div>
              <div className="text-sm text-text-secondary">שביעות רצון ⭐</div>
            </div>
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
      <section className="py-20 px-4 bg-white">
        <div className="container-mobile max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              מה מחכה לך? 🌟
            </h2>
            <p className="text-text-secondary">
              מערכת שלמה שתלווה אותך בכל שלב
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium hover:scale-[1.02] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-mobile max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              איך זה עובד? 🚀
            </h2>
          </motion.div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex items-center gap-4 card-premium"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container-mobile max-w-2xl mx-auto text-center"
        >
          <div className="card-gradient">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מוכנים להתחיל? 🎉
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              הצטרפו עכשיו וקבלו גישה מלאה לכל הקורסים
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Flame className="w-5 h-5" />
              בואו נתחיל!
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-50 border-t border-gray-200">
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
    icon: Target,
    title: 'קורסים מובנים 📚',
    description: 'שיעורים בווידאו, אודיו, טקסט ומצגות - כל מה שצריך להצלחה',
  },
  {
    icon: Award,
    title: 'מעקב התקדמות 📊',
    description: 'עקבו אחרי ההתקדמות שלכם עם גרפים וסטטיסטיקות',
  },
  {
    icon: Flame,
    title: 'הרגלים יומיים 🔥',
    description: 'בנו הרגלים בריאים עם מערכת מטלות יומיות',
  },
  {
    icon: Sparkles,
    title: 'AI ליווי 🤖',
    description: 'קבלו המלצות חכמות מותאמות אישית לפרוגרס שלכם',
  },
];

const steps = [
  {
    number: '1',
    title: 'הרשמה מהירה 📝',
    description: 'צרו חשבון ב-30 שניות והתחילו מיד',
  },
  {
    number: '2',
    title: 'בחירת קורס 🎯',
    description: 'בחרו מהקורסים הזמינים או קבלו המלצה מ-AI',
  },
  {
    number: '3',
    title: 'למידה ותרגול 📖',
    description: 'צפו בשיעורים, השלימו משימות ובנו הרגלים',
  },
  {
    number: '4',
    title: 'תוצאות 🔥',
    description: 'עקבו אחרי ההתקדמות וחגגו הישגים!',
  },
];
