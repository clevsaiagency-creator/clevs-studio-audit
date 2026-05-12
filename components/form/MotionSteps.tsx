"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FormState, FormAction } from "@/lib/formState";
import OptionGroup from "./OptionGroup";
import { DOMAIN_SUGGESTIONS } from "@/lib/suggestions";

interface Props { state: FormState; dispatch: React.Dispatch<FormAction>; }

const SCOPURI_VIDEO = [
  { label: "Ad / Publicitate", desc: "Spot pentru Social Media sau TV" },
  { label: "Social Media", desc: "Reels, TikTok, YouTube Shorts" },
  { label: "Prezentare brand", desc: "Intro, sting, identitate vizuală" },
  { label: "Corporate", desc: "Prezentări, pitch-uri, training" },
  { label: "Altceva", desc: "Îmi explici tu mai jos" },
];

const VIBE_OPTIONS = [
  { label: "Cinematic", desc: "Slow motion, dramatic, premium — inspiră emoție" },
  { label: "Energic", desc: "Fast cuts, impact imediat, adrenalină" },
  { label: "Minimalist", desc: "Curat, elegant, spațiu alb — mai puțin e mai mult" },
  { label: "Corporate", desc: "Profesional, formal, inspire încredere" },
];

const FOOTAGE_OPTIONS = [
  { label: "Da, am footage", desc: "Trimit clip-uri, fotografii sau link drive" },
  { label: "Nu, construiți voi", desc: "Creați de la zero, fără materiale de la mine" },
  { label: "Nu știu încă", desc: "Vorbim când ajungem la asta" },
];

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-xl sm:text-2xl font-bold mb-2"
    >
      {children}
    </motion.h2>
  );
}

function StepSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="text-foreground-muted text-sm mb-8"
    >
      {children}
    </motion.p>
  );
}

export default function MotionSteps({ state, dispatch }: Props) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filtered = DOMAIN_SUGGESTIONS.filter(
    (s) => s.toLowerCase().includes(state.domeniu.toLowerCase()) && state.domeniu.length > 0
  );

  const hasAltceva = state.scopVideo.includes("Altceva");

  return (
    <>
      {/* ── Step 1: Domeniu ── */}
      {state.step === 1 && (
        <div>
          <StepTitle>Cu ce se ocupă brandul tău?</StepTitle>
          <StepSubtitle>Câteva cuvinte — ex. "agenție imobiliară", "studio fitness", "SaaS B2B"</StepSubtitle>
          <div className="relative">
            <input
              type="text"
              value={state.domeniu}
              onChange={(e) => {
                dispatch({ type: "set", field: "domeniu", value: e.target.value });
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Ex: studio foto, restaurant, magazin online..."
              className="input-base"
              autoFocus
            />
            {showSuggestions && filtered.length > 0 && (
              <div
                className="absolute top-full mt-2 w-full rounded-xl border border-border bg-background-elevated z-20 overflow-hidden"
                style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
              >
                {filtered.slice(0, 6).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseDown={() => {
                      dispatch({ type: "set", field: "domeniu", value: s });
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-surface-hover transition-colors text-foreground-muted hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Step 2: Scop video (single-select) ── */}
      {state.step === 2 && (
        <div>
          <StepTitle>Scopul principal al video-ului</StepTitle>
          <StepSubtitle>Alege varianta care se potrivește cel mai bine.</StepSubtitle>
          <OptionGroup
            options={SCOPURI_VIDEO}
            value={state.scopVideo[0] || ""}
            onChange={(v) => dispatch({ type: "set", field: "scopVideo", value: [v] })}
          />
          {hasAltceva && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <input
                type="text"
                value={state.altcevaScop}
                onChange={(e) => dispatch({ type: "set", field: "altcevaScop", value: e.target.value })}
                placeholder="Descrie pe scurt ce ai nevoie..."
                className="input-base"
                autoFocus
              />
            </motion.div>
          )}
        </div>
      )}

      {/* ── Step 3: Footage ── */}
      {state.step === 3 && (
        <div>
          <StepTitle>Ai footage existent?</StepTitle>
          <StepSubtitle>Clipuri, poze, materiale — orice ajutor pentru concept.</StepSubtitle>
          <OptionGroup
            options={FOOTAGE_OPTIONS}
            value={
              state.footageExistent === "da" ? "Da, am footage" :
              state.footageExistent === "nu" ? "Nu, construiți voi" :
              state.footageExistent === "nu_stiu" ? "Nu știu încă" : ""
            }
            onChange={(v) => {
              const map: Record<string, "da" | "nu" | "nu_stiu"> = {
                "Da, am footage": "da",
                "Nu, construiți voi": "nu",
                "Nu știu încă": "nu_stiu",
              };
              dispatch({ type: "set", field: "footageExistent", value: map[v] });
              dispatch({ type: "set", field: "footageLink", value: "" });
            }}
          />
          {state.footageExistent === "da" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <input
                type="text"
                value={state.footageLink}
                onChange={(e) => dispatch({ type: "set", field: "footageLink", value: e.target.value })}
                placeholder="Link Drive / WeTransfer / site *"
                className="input-base"
                autoFocus
              />
            </motion.div>
          )}
        </div>
      )}

      {/* ── Step 4: Vibe ── */}
      {state.step === 4 && (
        <div>
          <StepTitle>Ce vibe vrei pentru video?</StepTitle>
          <StepSubtitle>Asta ne ajută să calibrăm tonul vizual al conceptului.</StepSubtitle>
          <OptionGroup
            options={VIBE_OPTIONS}
            value={state.vibe}
            onChange={(v) => dispatch({ type: "set", field: "vibe", value: v })}
          />
        </div>
      )}

      {/* ── Step 5: Culori brand ── */}
      {state.step === 5 && (
        <div>
          <StepTitle>Ai culori de brand definite?</StepTitle>
          <StepSubtitle>Dacă da, le respectăm. Dacă nu, noi alegem ce ți se potrivește.</StepSubtitle>
          <OptionGroup
            options={["Da, am culori", "Nu, alegeți voi"]}
            value={state.areCulori === "da" ? "Da, am culori" : state.areCulori === "nu" ? "Nu, alegeți voi" : ""}
            onChange={(v) => dispatch({ type: "set", field: "areCulori", value: v.startsWith("Da") ? "da" : "nu" })}
          />
          {state.areCulori === "da" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <input
                type="text"
                value={state.culoriText}
                onChange={(e) => dispatch({ type: "set", field: "culoriText", value: e.target.value })}
                placeholder="Ex: albastru închis, alb, #0055FF"
                className="input-base"
              />
            </motion.div>
          )}
        </div>
      )}

      {/* ── Step 6: Contact ── */}
      {state.step === 6 && (
        <div>
          <StepTitle>Unde trimitem conceptul?</StepTitle>
          <StepSubtitle>Email sau WhatsApp — suficient unul dintre ele.</StepSubtitle>
          <div className="space-y-4">
            <input
              type="text"
              value={state.numeAfacere}
              onChange={(e) => dispatch({ type: "set", field: "numeAfacere", value: e.target.value })}
              placeholder="Numele brandului / afacerii *"
              className="input-base"
            />
            <input
              type="text"
              value={state.nume}
              onChange={(e) => dispatch({ type: "set", field: "nume", value: e.target.value })}
              placeholder="Prenumele tău *"
              className="input-base"
            />
            <input
              type="email"
              value={state.email}
              onChange={(e) => dispatch({ type: "set", field: "email", value: e.target.value })}
              placeholder="Email (opțional dacă dai WhatsApp)"
              className="input-base"
            />
            <input
              type="tel"
              value={state.whatsapp}
              onChange={(e) => dispatch({ type: "set", field: "whatsapp", value: e.target.value })}
              placeholder="WhatsApp (opțional dacă dai email)"
              className="input-base"
            />
          </div>
          <p className="text-xs text-foreground-dim mt-4">
            Datele tale nu sunt folosite în scop comercial. Nu primești spam.
          </p>
        </div>
      )}
    </>
  );
}
