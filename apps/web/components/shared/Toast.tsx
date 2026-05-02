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
    bg: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.35)',
    iconColor: '#10b981',
    titleColor: '#6ee7b7',
    bar: '#10b981',
  },
  error: {
    icon: XCircle,
    bg: 'rgba(239,68,68,0.15)',
    border: 'rgba(239,68,68,0.35)',
    iconColor: '#ef4444',
    titleColor: '#fca5a5',
    bar: '#ef4444',
  },
  info: {
    icon: Info,
    bg: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.35)',
    iconColor: '#3b82f6',
    titleColor: '#93c5fd',
    bar: '#3b82f6',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'rgba(234,179,8,0.15)',
    border: 'rgba(234,179,8,0.35)',
    iconColor: '#eab308',
    titleColor: '#fde047',
    bar: '#eab308',
  },
};

function Toast({ toast, onDismiss }: ToastProps) {
  const c = config[toast.type];
  const Icon = c.icon;

  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="relative overflow-hidden rounded-2xl shadow-2xl w-full max-w-sm"
      style={{
        background: 'rgba(15,23,42,0.92)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${c.border}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${c.border}`,
      }}
    >
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5"
        style={{ background: c.bar }}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 4, ease: 'linear' }}
      />

      <div className="flex items-start gap-3 p-4 pr-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: c.bg }}>
          <Icon className="w-5 h-5" style={{ color: c.iconColor }} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 text-right">
          <p className="font-bold text-sm leading-tight" style={{ color: c.titleColor }}>
            {toast.title}
          </p>
          {toast.message && (
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{toast.message}</p>
          )}
        </div>

        {/* Close */}
        <button
          onClick={() => onDismiss(toast.id)}
          className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
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
