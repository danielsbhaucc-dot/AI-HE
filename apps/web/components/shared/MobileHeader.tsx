'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { BookOpen, TrendingUp, UserCircle, X, Menu, Leaf, Bell } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileHeaderProps {
  user: User;
  title?: string;
}

const menuItems = [
  { href: '/courses',  label: 'הקורסים שלי',  emoji: '📚', icon: BookOpen  },
  { href: '/progress', label: 'התקדמות שלי', emoji: '📊', icon: TrendingUp },
  { href: '/profile',  label: 'הפרופיל שלי',  emoji: '👤', icon: UserCircle },
];

export function MobileHeader({ user, title }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 safe-area-top nav-header">
        <div className="container-mobile h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href="/courses"
            className="flex items-center gap-2 no-tap-highlight"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #14b8a6, #10b981)', boxShadow: '0 4px 12px rgba(20,184,166,0.4)' }}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg text-white leading-none">
              Nura<span className="text-gradient">Well</span>
            </span>
          </Link>

          {/* Center Title */}
          {title && (
            <p className="flex-1 text-center text-sm font-semibold text-slate-300 line-clamp-1 px-2">
              {title}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              aria-label="התראות"
              className="btn-icon text-slate-400 hover:text-white"
            >
              <Bell className="w-4.5 h-4.5" />
            </button>
            <button
              aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
              className="btn-icon text-slate-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="container-mobile pb-4 pt-2"
            >
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(15,23,42,0.97)', border: '1px solid rgba(255,255,255,0.10)' }}>
                {menuItems.map((item, idx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-4 transition-all hover:bg-white/5 active:bg-white/8 no-tap-highlight ${idx < menuItems.length - 1 ? 'border-b border-white/5' : ''}`}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span className="font-semibold text-slate-200">{item.label}</span>
                    <item.icon className="w-4 h-4 text-primary-400 mr-auto" />
                  </Link>
                ))}
                <div className="px-5 py-3 border-t border-white/5">
                  <p className="text-xs text-slate-500 text-center">
                    👋 שלום, {user.email?.split('@')[0]}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
