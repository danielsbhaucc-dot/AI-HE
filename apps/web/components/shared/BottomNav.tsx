'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, TrendingUp, UserCircle, Home } from 'lucide-react';
import { cn } from '@/lib/cn';

const navItems = [
  { href: '/courses', label: 'קורסים', icon: BookOpen },
  { href: '/progress', label: 'התקדמות', icon: TrendingUp },
  { href: '/profile', label: 'פרופיל', icon: UserCircle },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 safe-area-bottom">
      <div className="container-mobile">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200',
                  isActive 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-text-muted hover:text-text-secondary'
                )}
              >
                <item.icon className={cn(
                  'w-6 h-6 transition-transform duration-200',
                  isActive && 'scale-110'
                )} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
