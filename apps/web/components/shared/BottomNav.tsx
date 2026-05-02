'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, TrendingUp, UserCircle } from 'lucide-react';
import { cn } from '../../lib/cn';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/courses',  label: 'קורסים',  icon: BookOpen   },
  { href: '/progress', label: 'התקדמות', icon: TrendingUp },
  { href: '/profile',  label: 'פרופיל',  icon: UserCircle },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom nav-bottom">
      <div className="container-mobile">
        <div className="flex items-center justify-around py-1.5 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 no-tap-highlight touch-manipulation',
                  isActive ? 'text-primary-400' : 'text-slate-500 hover:text-slate-300'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.25)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -1 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="relative z-10"
                >
                  <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
                </motion.div>
                <span className={cn('text-xs font-semibold relative z-10 transition-all', isActive ? 'text-primary-400' : 'text-slate-500')}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
