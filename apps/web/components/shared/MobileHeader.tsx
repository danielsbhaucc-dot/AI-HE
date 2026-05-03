'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { BookOpen, TrendingUp, UserCircle, X, Menu, Bell } from 'lucide-react';
import { NuraWellLogo } from './NuraWellLogo';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileHeaderProps {
  user: User;
  title?: string;
}

const menuItems = [
  { href: '/courses',  label: 'הקורסים שלי',  icon: BookOpen,    color: '#7b6ef6' },
  { href: '/progress', label: 'התקדמות שלי', icon: TrendingUp,  color: '#0dbdb8' },
  { href: '/profile',  label: 'הפרופיל שלי',  icon: UserCircle, color: '#d946ef' },
];

export function MobileHeader({ user, title }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 safe-area-top overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1e1260 0%, #3730A3 50%, #6B5FD4 100%)' }}>
        {/* Orb 1 */}
        <div className="absolute pointer-events-none" style={{
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,110,246,0.45) 0%, transparent 70%)',
          top: '-80px', left: '-60px', filter: 'blur(20px)'
        }} />
        {/* Orb 2 */}
        <div className="absolute pointer-events-none" style={{
          width: '130px', height: '130px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,189,184,0.35) 0%, transparent 70%)',
          top: '8px', right: '-30px', filter: 'blur(16px)'
        }} />
        {/* Grid pattern */}
        <div className="header-grid-pattern" />
        <div className="container-mobile h-16 flex items-center justify-between gap-3 relative z-10">
          {/* Logo */}
          <Link
            href="/courses"
            className="no-tap-highlight"
            onClick={() => setIsMenuOpen(false)}
          >
            <NuraWellLogo size="sm" />
          </Link>

          {/* Center Title */}
          {title && (
            <p className="flex-1 text-center text-sm font-semibold text-white/80 line-clamp-1 px-2">
              {title}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              aria-label="התראות"
              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-90"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)' }}
            >
              <Bell className="w-5 h-5 text-white/90" />
            </button>
            <button
              aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-90"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5 text-white" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5 text-white" />
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
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(26,16,64,0.97)', backdropFilter: 'blur(24px)', border: '1px solid rgba(123,110,246,0.25)', boxShadow: '0 8px 32px rgba(45,27,142,0.4)' }}>
                {menuItems.map((item, idx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3.5 px-5 py-4 transition-all hover:bg-white/8 active:bg-white/12 no-tap-highlight ${idx < menuItems.length - 1 ? 'border-b border-white/8' : ''}`}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}>
                      <item.icon className="w-4.5 h-4.5" style={{ color: item.color }} />
                    </div>
                    <span className="font-bold text-slate-100 flex-1">{item.label}</span>
                    <item.icon className="w-3.5 h-3.5 text-slate-600" />
                  </Link>
                ))}
                <div className="px-5 py-3.5 border-t border-white/5 flex items-center gap-2.5">
                  <UserCircle className="w-4 h-4 text-slate-500" />
                  <p className="text-xs text-slate-500 font-medium">
                    שלום, {user.email?.split('@')[0]}
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
