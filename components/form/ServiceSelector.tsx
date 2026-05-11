"use client";

import { motion } from "framer-motion";
import type { FormAction, ServiceType } from "@/lib/formState";

interface ServiceSelectorProps {
  dispatch: React.Dispatch<FormAction>;
}

const SERVICES: { type: ServiceType; icon: React.ReactNode; title: string; tagline: string; what: string; badge: string }[] = [
  {
    type: "website",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Website Concept",
    tagline: "Primești o previzualizare gratuită a site-ului tău",
    what: "Design + structură + paleta de culori, gata de analizat",
    badge: "€150–250",
  },
  {
    type: "motion",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    title: "Motion Video",
    tagline: "Primești un concept animat de 10 secunde, complet gratuit",
    what: "Motion graphics + voiceover + SFX pe footage-ul tău",
    badge: "€29 / minut",
  },
];

export default function ServiceSelector({ dispatch }: ServiceSelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10"
      >
        <div className="text-accent font-mono text-xs tracking-widest mb-3">PASUL 0 DIN 6</div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ce concept vrei să primești?</h2>
        <p className="text-foreground-muted text-sm sm:text-base">
          Alege serviciul și completezi câteva detalii. Conceptul gratuit ajunge la tine în cel mai scurt timp.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {SERVICES.map((s, i) => (
          <motion.button
            key={s.type}
            type="button"
            onClick={() => dispatch({ type: "selectService", service: s.type })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileTap={{ scale: 0.98 }}
            className="service-card text-left group"
          >
            {/* Glow overlay on hover */}
            <div
              className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "radial-gradient(circle at 30% 30%, rgba(79,142,255,0.08), transparent 70%)" }}
            />

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-accent"
              style={{ background: "rgba(79,142,255,0.1)", border: "1px solid rgba(79,142,255,0.25)" }}
            >
              {s.icon}
            </div>

            <div
              className="inline-block text-xs font-mono px-2.5 py-1 rounded-full mb-4"
              style={{ background: "rgba(79,142,255,0.12)", border: "1px solid rgba(79,142,255,0.25)", color: "#4f8eff" }}
            >
              {s.badge}
            </div>

            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-accent text-sm font-medium mb-2">{s.tagline}</p>
            <p className="text-foreground-dim text-sm leading-relaxed">{s.what}</p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent">
              Vreau ăsta
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
