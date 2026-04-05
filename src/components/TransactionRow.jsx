import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { listItemVariants } from "../utils/motionVariants";

export default function TransactionRow({ transaction, compact = false }) {
  const { formatCurrency } = useApp();
  const isCredit = transaction.type === "credit";

  return (
    <motion.div
      variants={listItemVariants}
      whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.03)" }}
      transition={{ duration: 0.15 }}
      className={`flex items-center gap-4 px-4 rounded-xl transition-colors cursor-default ${compact ? "py-2.5" : "py-3"}`}
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 8 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-lg flex-shrink-0"
      >
        {transaction.icon}
      </motion.div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-body font-medium text-white/90 truncate">{transaction.name}</p>
        <p className="text-xs text-white/40 mt-0.5">{transaction.category} · {transaction.date}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-display font-700 ${isCredit ? "text-brand-300" : "text-white/80"}`}>
          {isCredit ? "+" : "–"}{formatCurrency(Math.abs(transaction.amount))}
        </p>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-body ${
          isCredit ? "bg-brand-300/10 text-brand-300/80" : "bg-white/[0.05] text-white/30"
        }`}>
          {isCredit ? "Credit" : "Debit"}
        </span>
      </div>
    </motion.div>
  );
}