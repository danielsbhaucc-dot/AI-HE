'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, TrendingUp, UserCircle, Compass } from 'lucide-react';
import { cn } from '../../lib/cn';
import { motion } from 'framer-motion';

const sideItems = [
  { href: '/courses',  label: 'קורסים',  icon: BookOpen   },
  { href: '/progress', label: 'התקדמות', icon: TrendingUp },
  { href: '/profile',  label: 'פרופיל',  icon: UserCircle },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom nav-bottom">
      <div className="container-mobile relative">
        {/* Center raised button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-20">
          <Link
            href="/courses"
            className="flex items-center justify-center no-tap-highlight touch-manipulation transition-transform hover:scale-105 active:scale-95"
            style={{
              width: '58px', height: '58px',
              background: 'linear-gradient(145deg, #2D1B8E, #6B5FD4)',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(45,27,142,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
              border: '1.5px solid rgba(255,255,255,0.15)',
            }}
          >
            <Compass className="w-6 h-6 text-white" strokeWidth={2} />
          </Link>
        </div>

        <div className="flex items-center justify-around py-1.5 px-2">
          {sideItems.map((item, idx) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            /* Add spacer in the middle for the center button */
            return (
              <div key={item.href} className={cn('flex-1 flex justify-center', idx === 1 && 'mx-10')}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 no-tap-highlight touch-manipulation',
                    isActive ? 'text-[#4A3BC4]' : 'text-[#9896B8] hover:text-[#5A5880]'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: 'rgba(74,59,196,0.10)', border: '1px solid rgba(74,59,196,0.22)' }}
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
                  <span className={cn('text-xs font-semibold relative z-10 transition-all', isActive ? 'text-[#4A3BC4]' : 'text-[#9896B8]')}>
                    {item.label}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
