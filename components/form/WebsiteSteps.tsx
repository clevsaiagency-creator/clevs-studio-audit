"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FormState, FormAction } from "@/lib/formState";
import OptionGroup from "./OptionGroup";
import { DOMAIN_SUGGESTIONS } from "@/lib/suggestions";

interface Props { state: FormState; dispatch: React.Dispatch<FormAction>; }

const SCOPURI = [
  { label: "Prezentare", desc: "Arată cine ești și ce faci" },
  { label: "Programări", desc: "Clienți care rezervă direct din site" },
  { label: "Vânzări", desc: "Magazin online, produse, servicii" },
  { label: "Portofoliu", desc: "Showcase de lucrări și proiecte" },
];

const STILURI = [
  { label: "Elegant & Profesional", desc: "Clasic, rafinat, inspiră încredere" },
  { label: "Modern & Bold", desc: "Vizual puternic, animații, impact" },
  { label: "Minimalist & Curat", desc: "Simplu, spațios, fără zgomot" },
  { label: "Nu știu, decideți voi", desc: "Facem noi recomandarea potrivită" },
];

const BUGETE = ["€150 — Basic", "€200 — Standard", "€250 — Premium", "€300+ — Personalizat"];

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

export default function WebsiteSteps({ state, dispatch }: Props) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filtered = DOMAIN_SUGGESTIONS.filter(
    (s) => s.toLowerCase().includes(state.domeniu.toLowerCase()) && state.domeniu.length > 0
  );

  return (
    <>
      {/* ── Step 1: Domeniu ── */}
      {state.step === 1 && (
        <div>
          <StepTitle>Cu ce se ocupă afacerea ta?</StepTitle>
          <StepSubtitle>Câteva cuvinte despre domeniu — ex. "salon de înfrumusețare", "service auto"</StepSubtitle>
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
              placeholder="Ex: cabinet stomatologic, restaurant, frizerie..."
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

      {/* ── Step 2: Ai website? ── */}
      {state.step === 2 && (
        <div>
          <StepTitle>Ai deja un website?</StepTitle>
          <StepSubtitle>Chiar dacă ai ceva vechi sau stricat, ne ajută să știm.</StepSubtitle>
          <OptionGroup
            options={["Da, am un site", "Nu, nu am nimic"]}
            value={state.areWebsite === null ? "" : state.areWebsite ? "Da, am un site" : "Nu, nu am nimic"}
            onChange={(v) => dispatch({ type: "set", field: "areWebsite", value: v.startsWith("Da") })}
          />
          {state.areWebsite === true && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <input
                type="url"
                value={state.websiteLink}
                onChange={(e) => dispatch({ type: "set", field: "websiteLink", value: e.target.value })}
                placeholder="Link website (opțional) — ex: site-ul-meu.ro"
                className="input-base"
              />
            </motion.div>
          )}
        </div>
      )}

      {/* ── Step 3: Scopuri (multi-select) ── */}
      {state.step === 3 && (
        <div>
          <StepTitle>Ce vrei să facă site-ul?</StepTitle>
          <StepSubtitle>Poți selecta mai multe variante.</StepSubtitle>
          <OptionGroup
            options={SCOPURI}
            value={state.scopuri}
            onChange={(v) => dispatch({ type: "toggleMulti", field: "scopuri", value: v })}
            multiSelect
          />
        </div>
      )}

      {/* ── Step 4: Stil ── */}
      {state.step === 4 && (
        <div>
          <StepTitle>Ce stil preferi?</StepTitle>
          <StepSubtitle>Alege atmosfera vizuală care ți se potrivește.</StepSubtitle>
          <OptionGroup
            options={STILURI}
            value={state.stilWebsite}
            onChange={(v) => dispatch({ type: "set", field: "stilWebsite", value: v })}
          />
        </div>
      )}

      {/* ── Step 5: Buget ── */}
      {state.step === 5 && (
        <div>
          <StepTitle>Care e bugetul tău?</StepTitle>
          <StepSubtitle>Toate pachetele includ site profesional, mobile-friendly și deploy. Fără costuri ascunse.</StepSubtitle>
          <OptionGroup
            options={BUGETE}
            value={state.buget}
            onChange={(v) => dispatch({ type: "set", field: "buget", value: v })}
          />
          <p className="text-xs text-foreground-dim mt-4">
            Domeniu propriu: €10–25/an, plătit separat de tine. Alex configurează totul gratuit.
          </p>
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
              placeholder="Numele afacerii *"
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
