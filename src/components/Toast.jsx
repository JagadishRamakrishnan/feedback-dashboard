import React, { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2 w-[min(90vw,360px)]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-start gap-3 rounded-xl border border-border bg-white shadow-card px-4 py-3 animate-[fadeIn_0.2s_ease-out]"
          >
            {t.type === "success" ? (
              <CheckCircle2 size={18} className="text-success mt-0.5 shrink-0" />
            ) : (
              <XCircle size={18} className="text-danger mt-0.5 shrink-0" />
            )}
            <p className="text-sm text-ink flex-1">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="text-ink-faint hover:text-ink shrink-0"
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
