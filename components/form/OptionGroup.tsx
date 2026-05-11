"use client";

import { motion } from "framer-motion";

interface Option {
  label: string;
  desc?: string;
}

interface OptionGroupProps {
  options: (string | Option)[];
  value: string | string[];
  onChange: (value: string) => void;
  multiSelect?: boolean;
}

export default function OptionGroup({ options, value, onChange, multiSelect = false }: OptionGroupProps) {
  const isSelected = (opt: string) =>
    multiSelect ? (value as string[]).includes(opt) : value === opt;

  return (
    <div className="grid gap-3">
      {options.map((opt, i) => {
        const label = typeof opt === "string" ? opt : opt.label;
        const desc = typeof opt === "string" ? undefined : opt.desc;
        const selected = isSelected(label);
        return (
          <motion.button
            key={label}
            type="button"
            onClick={() => onChange(label)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileTap={{ scale: 0.99 }}
            className={`relative w-full text-left px-5 py-4 rounded-xl border transition-all ${
              selected
                ? "border-accent bg-accent/10 text-foreground shadow-[0_0_0_1px_var(--accent)]"
                : "border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-hover"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-base font-medium">{label}</span>
                {desc && <p className="text-xs text-foreground-dim mt-0.5">{desc}</p>}
              </div>
              <div
                className={`flex-shrink-0 w-5 h-5 border-2 transition-all flex items-center justify-center ${
                  selected ? "border-accent bg-accent" : "border-border-strong"
                } ${multiSelect ? "rounded-md" : "rounded-full"}`}
              >
                {selected && (
                  <svg className="w-3 h-3 text-background" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
