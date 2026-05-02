'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const config = {
  success: {
    icon: CheckCircle,
    iconBg: 'rgba(16,185,129,0.2)',
    iconColor: '#34d399',
    titleColor: '#a7f3d0',
    msgColor: '#6ee7b7',
    border: 'rgba(16,185,129,0.3)',
    glow: 'rgba(16,185,129,0.12)',
    bar: 'linear-gradient(90deg, #10b981, #34d399)',
    cardBg: 'rgba(16,185,129,0.07)',
    sideBar: '#10b981',
  },
  error: {
    icon: XCircle,
    iconBg: 'rgba(239,68,68,0.2)',
    iconColor: '#f87171',
    titleColor: '#fecaca',
    msgColor: '#fca5a5',
    border: 'rgba(239,68,68,0.35)',
    glow: 'rgba(239,68,68,0.15)',
    bar: 'linear-gradient(90deg, #ef4444, #f87171)',
    cardBg: 'rgba(239,68,68,0.08)',
    sideBar: '#ef4444',
  },
  info: {
    icon: Info,
    iconBg: 'rgba(59,130,246,0.2)',
    iconColor: '#60a5fa',
    titleColor: '#bfdbfe',
    msgColor: '#93c5fd',
    border: 'rgba(59,130,246,0.3)',
    glow: 'rgba(59,130,246,0.12)',
    bar: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
    cardBg: 'rgba(59,130,246,0.07)',
    sideBar: '#3b82f6',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'rgba(234,179,8,0.2)',
    iconColor: '#fbbf24',
    titleColor: '#fef08a',
    msgColor: '#fde047',
    border: 'rgba(234,179,8,0.3)',
    glow: 'rgba(234,179,8,0.12)',
    bar: 'linear-gradient(90deg, #eab308, #fbbf24)',
    cardBg: 'rgba(234,179,8,0.07)',
    sideBar: '#eab308',
  },
};

function Toast({ toast, onDismiss }: ToastProps) {
  const c = config[toast.type];
  const Icon = c.icon;

  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 4500);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -28, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      className="relative overflow-hidden w-full"
      style={{
        borderRadius: '18px',
        background: `linear-gradient(135deg, ${c.cardBg}, rgba(11,18,32,0.88))`,
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: `1px solid ${c.border}`,
        boxShadow: `0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px ${c.border}, inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Top color glow strip */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: c.bar }} />

      {/* Left color bar (RTL = right side visually) */}
      <div className="absolute top-3 bottom-3 right-0 w-0.5 rounded-full" style={{ background: c.sideBar, opacity: 0.8 }} />

      {/* Progress bar bottom */}
      <motion.div
        className="absolute bottom-0 right-0 h-0.5 rounded-full"
        style={{ background: c.bar }}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 4.5, ease: 'linear' }}
      />

      <div className="flex items-start gap-3 px-4 py-3.5 pr-5">
        {/* Icon badge */}
        <div
          className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{
            background: c.iconBg,
            boxShadow: `0 0 12px ${c.glow}`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: c.iconColor }} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 text-right">
          <p className="font-bold text-base leading-tight" style={{ color: c.titleColor, fontFamily: 'Rubik, Heebo, sans-serif' }}>
            {toast.title}
          </p>
          {toast.message && (
            <p className="text-sm mt-0.5 leading-relaxed" style={{ color: c.msgColor, opacity: 0.85 }}>
              {toast.message}
            </p>
          )}
        </div>

        {/* Close */}
        <button
          onClick={() => onDismiss(toast.id)}
          className="flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center transition-colors"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ---- Toast Container ----
interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 w-full px-4 max-w-sm pointer-events-none">
      <AnimatePresence mode="sync">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast toast={t} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ---- Hook ----
export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const show = (type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    toasts,
    dismiss,
    success: (title: string, message?: string) => show('success', title, message),
    error: (title: string, message?: string) => show('error', title, message),
    info: (title: string, message?: string) => show('info', title, message),
    warning: (title: string, message?: string) => show('warning', title, message),
  };
}
