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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 safe-area-top">
      <div className="container-mobile h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/courses" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-gradient hidden sm:block">
            WeightLossAI
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-text-secondary hover:bg-gray-200 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link
            href="/profile"
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-primary-600"
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
            className="border-t border-gray-100 bg-white"
          >
            <nav className="container-mobile py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-primary hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-primary-500" />
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
