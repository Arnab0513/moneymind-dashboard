import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cardVariants } from "../utils/motionVariants";
import AnimatedNumber from "./AnimatedNumber";

export default function StatCard({ title, value, rawValue, change, icon: Icon, color = "brand", loading = false }) {
  const colorMap = {
    brand: { bg: "bg-brand-300/10", border: "border-brand-300/20", text: "text-brand-300", glow: "shadow-glow" },
    blue:  { bg: "bg-blue-400/10",  border: "border-blue-400/20",  text: "text-blue-400",  glow: "" },
    red:   { bg: "bg-red-400/10",   border: "border-red-400/20",   text: "text-red-400",   glow: "" },
    purple:{ bg: "bg-purple-400/10",border: "border-purple-400/20",text: "text-purple-400",glow: "" },
  };
  const c = colorMap[color];
  const isPositive = change >= 0;

  if (loading) {
    return (
      <div className="glass-card p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-3 skeleton rounded w-24" />
          <div className="w-9 h-9 skeleton rounded-xl" />
        </div>
        <div className="h-8 skeleton rounded w-32" />
        <div className="h-3 skeleton rounded w-20" />
      </div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="glass-card p-5 cursor-default group"
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-body text-white/50 uppercase tracking-wider">{title}</p>
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`w-9 h-9 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0 ${c.glow}`}
        >
          <Icon size={17} className={c.text} />
        </motion.div>
      </div>

      <div className="font-display font-700 text-2xl text-white tracking-tight mb-2">
        {rawValue != null
          ? <AnimatedNumber value={rawValue} prefix={value.includes("₹") ? "₹" : "$"} decimals={2} />
          : value}
      </div>

      <div className="flex items-center gap-1.5">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
          className={`flex items-center gap-1 text-xs font-body font-medium ${isPositive ? "text-brand-300" : "text-red-400"}`}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{isPositive ? "+" : ""}{change}%</span>
        </motion.div>
        <span className="text-xs text-white/30">vs last month</span>
      </div>
    </motion.div>
  );
}