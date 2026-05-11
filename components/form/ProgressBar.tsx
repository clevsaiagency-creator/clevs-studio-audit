"use client";

import { motion } from "framer-motion";
import type { ServiceType } from "@/lib/formState";

const WEBSITE_LABELS = ["Domeniu", "Site actual", "Scopuri", "Stil", "Buget", "Contact"];
const MOTION_LABELS  = ["Domeniu", "Scop video", "Footage", "Vibe", "Culori", "Contact"];

export default function ProgressBar({ step, serviceType }: { step: number; serviceType: ServiceType | null }) {
  const labels = serviceType === "motion" ? MOTION_LABELS : WEBSITE_LABELS;
  const percent = (step / 6) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-medium">
        <span className="text-foreground-muted">
          Pasul <span className="text-foreground">{step}</span> din 6
        </span>
        <span className="text-accent font-mono">{Math.round(percent)}%</span>
      </div>
      <div className="relative h-2 rounded-full bg-surface overflow-hidden border border-border">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #4f8eff, #8b5cf6, #f97316)" }}
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="hidden sm:flex items-center justify-between mt-3 text-xs text-foreground-dim">
        {labels.map((label, i) => (
          <div
            key={label}
            className={`transition-colors ${i + 1 <= step ? "text-foreground-muted" : "text-foreground-dim"}`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
