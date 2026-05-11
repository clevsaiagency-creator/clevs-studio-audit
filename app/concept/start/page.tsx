"use client";

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import WatercolorBackground from "@/components/WatercolorBackground";
import ProgressBar from "@/components/form/ProgressBar";
import ServiceSelector from "@/components/form/ServiceSelector";
import WebsiteSteps from "@/components/form/WebsiteSteps";
import MotionSteps from "@/components/form/MotionSteps";
import { formReducer, INITIAL_STATE, isStepValid } from "@/lib/formState";

export default function ConceptStartPage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = isStepValid(state);
  const isServiceSelected = state.step > 0;
  const isLastStep = state.step === 6;

  const handleNext = async () => {
    if (!valid) return;
    if (!isLastStep) {
      dispatch({ type: "next" });
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: state.serviceType,
          domeniu: state.domeniu.trim(),
          // Website
          areWebsite: state.areWebsite,
          websiteLink: state.websiteLink.trim() || null,
          scopuri: state.scopuri,
          stilWebsite: state.stilWebsite || null,
          buget: state.buget || null,
          // Motion
          scopVideo: state.scopVideo,
          altcevaScop: state.altcevaScop.trim() || null,
          footageExistent: state.footageExistent || null,
          footageLink: state.footageLink.trim() || null,
          vibe: state.vibe || null,
          areCulori: state.areCulori || null,
          culoriText: state.culoriText.trim() || null,
          // Contact
          numeAfacere: state.numeAfacere.trim(),
          nume: state.nume.trim(),
          email: state.email.trim().toLowerCase() || null,
          whatsapp: state.whatsapp.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Eroare ${res.status}`);
      }

      router.push("/concept/multumire");
    } catch (e) {
      setError(e instanceof Error ? e.message : "A apărut o eroare. Încearcă din nou.");
      setSubmitting(false);
    }
  };

  const handlePrev = () => dispatch({ type: "prev" });

  return (
    <>
      <WatercolorBackground />

      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-foreground">
            <Image src="/clevs-studio-logo.png" alt="Clevs Studio" width={28} height={28} style={{ objectFit: "contain", mixBlendMode: "lighten" }} />
            <span className="font-bold text-base">Clevs Studio</span>
          </Link>
          <Link href="/" className="text-sm text-foreground-muted hover:text-foreground transition">
            ← Înapoi la site
          </Link>
        </header>

        {/* Progress bar — only after service selected */}
        {isServiceSelected && (
          <div className="pt-6 pb-10">
            <ProgressBar step={state.step} serviceType={state.serviceType} />
          </div>
        )}

        {/* Content */}
        <div className={`flex-1 flex flex-col items-center px-6 pb-12 ${!isServiceSelected ? "pt-10" : ""}`}>
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {state.step === 0 && <ServiceSelector dispatch={dispatch} />}
                {state.step > 0 && state.serviceType === "website" && (
                  <WebsiteSteps state={state} dispatch={dispatch} />
                )}
                {state.step > 0 && state.serviceType === "motion" && (
                  <MotionSteps state={state} dispatch={dispatch} />
                )}
              </motion.div>
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Navigation — only after service selection */}
            {isServiceSelected && (
              <div className="mt-10 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={submitting}
                  className="btn-secondary"
                >
                  ← Înapoi
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!valid || submitting}
                  className="btn-primary group"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                      Se trimite...
                    </span>
                  ) : isLastStep ? (
                    <>
                      Trimite cererea
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </>
                  ) : (
                    <>
                      Mai departe
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
