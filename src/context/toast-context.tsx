"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ToastState {
  id: number;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    if (timer.current) clearTimeout(timer.current);
    const id = Date.now();
    setToast({ id, message });
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2">
          <div
            key={toast.id}
            className="animate-[toast-in_0.25s_ease-out] rounded-lg bg-gray-900/95 px-5 py-3 text-sm font-medium text-white shadow-xl"
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
