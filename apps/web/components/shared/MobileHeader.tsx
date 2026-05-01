'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { Menu, Sparkles, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileHeaderProps {
  user: User;
}

export function MobileHeader({ user }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-area-top" style={{background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
      <div className="container-mobile h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/courses" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-lg text-white hidden sm:block">WeightLoss<span className="text-primary-400">AI</span></span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            style={{background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)'}}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link
            href="/profile"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-400"
            style={{background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.3)'}}
          >
            <UserCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className=""
            style={{background: 'rgba(15,23,42,0.98)', borderTop: '1px solid rgba(255,255,255,0.08)'}}
          >
            <nav className="container-mobile py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <item.icon className="w-5 h-5 text-primary-400" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const menuItems = [
  { href: '/courses', label: 'הקורסים שלי 📚', icon: BookOpen },
  { href: '/progress', label: 'התקדמות 📊', icon: TrendingUp },
  { href: '/profile', label: 'פרופיל 👤', icon: UserCircle },
];

import { BookOpen, TrendingUp } from 'lucide-react';
