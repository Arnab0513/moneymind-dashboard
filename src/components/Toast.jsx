import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useApp } from "../context/AppContext";

const icons = {
  success: <CheckCircle size={16} className="text-brand-300" />,
  error:   <AlertCircle size={16} className="text-red-400" />,
  warning: <AlertTriangle size={16} className="text-yellow-400" />,
  info:    <Info size={16} className="text-blue-400" />,
};

const borders = {
  success: "border-brand-300/30",
  error:   "border-red-400/30",
  warning: "border-yellow-400/30",
  info:    "border-blue-400/30",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 60, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`glass-card border ${borders[toast.type] || "border-white/10"} px-4 py-3 flex items-center gap-3 min-w-[280px] max-w-[380px] pointer-events-auto`}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }}>
              {icons[toast.type] || icons.info}
            </motion.div>
            <p className="flex-1 text-sm text-white/90 font-body">{toast.message}</p>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => removeToast(toast.id)}
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <X size={14} />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}