"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import WatercolorBackground from "@/components/WatercolorBackground";

// ── GlowWord ─────────────────────────────────────────────────────────────────

function GlowWord({ children, delay = 0, color = "#4f8eff" }: { children: string; delay?: number; color?: string }) {
  const glow = color === "#8b5cf6" ? "rgba(139,92,246," : color === "#f97316" ? "rgba(249,115,22," : "rgba(79,142,255,";
  return (
    <motion.span
      className="font-semibold"
      animate={{
        textShadow: [`0 0 0px ${glow}0)`, `0 0 14px ${glow}0.9), 0 0 28px ${glow}0.4)`, `0 0 0px ${glow}0)`],
        color: ["#f5f7ff", color === "#8b5cf6" ? "#c4b5fd" : color === "#f97316" ? "#fdba74" : "#a8c8ff", "#f5f7ff"],
      }}
      transition={{ duration: 2.8, delay, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

// ── PulsingStep ───────────────────────────────────────────────────────────────

function PulsingStep({ num, stepIndex, color = "rgba(79,142,255," }: { num: string; stepIndex: number; color?: string }) {
  const delay = stepIndex * 1.5;
  return (
    <motion.div
      className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-lg mb-6 relative z-10"
      animate={{
        boxShadow: [`0 0 0px ${color}0)`, `0 0 18px ${color}0.8), 0 0 36px ${color}0.35)`, `0 0 0px ${color}0)`],
        borderColor: [`${color}0.25)`, `${color}1)`, `${color}0.25)`],
        color: [`${color}1)`, "#f5f7ff", `${color}1)`],
      }}
      transition={{ duration: 0.9, delay, repeat: Infinity, repeatDelay: 4.6, ease: "easeInOut" }}
      style={{ background: "#0a0f2a", border: `1px solid ${color}0.25)` }}
    >
      {num}
    </motion.div>
  );
}

// ── Live Ticker ────────────────────────────────────────────────────────────────

const TICKER = [
  { what: "Website concept", biz: "Salon Éclat Beauty", city: "Cluj", time: "3 min" },
  { what: "Motion video", biz: "GreenArch Studio", city: "București", time: "11 min" },
  { what: "Website concept", biz: "Cabinet Dr. Mihai", city: "Timișoara", time: "22 min" },
  { what: "Motion video", biz: "FitLife Gym", city: "Iași", time: "34 min" },
  { what: "Website concept", biz: "La Dolce Vita Café", city: "Brașov", time: "48 min" },
  { what: "Motion video", biz: "Nova Agency", city: "Sibiu", time: "1h 02 min" },
];

function LiveTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex((i) => (i + 1) % TICKER.length); setVisible(true); }, 300);
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  const item = TICKER[index];
  return (
    <div className="flex items-center gap-2 text-sm min-w-0">
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
      <span style={{ transition: "opacity 0.3s", opacity: visible ? 1 : 0 }} className="truncate text-xs sm:text-sm">
        <span className="text-foreground font-medium">{item.what}</span>
        <span className="text-foreground-muted"> — </span>
        <span className="text-foreground-muted">{item.biz} din {item.city}</span>
        <span className="hidden sm:inline text-foreground-dim"> · acum {item.time}</span>
      </span>
    </div>
  );
}

// ── Studio Concept Preview Card (Hero visual) ─────────────────────────────────

function StudioConceptCard() {
  const [tab, setTab] = useState<"website" | "motion">("website");
  return (
    <div className="relative">
      <div style={{ position: "absolute", inset: 0, background: "rgba(139,92,246,0.15)", filter: "blur(70px)", borderRadius: 24, transform: "scale(0.9)" }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        style={{ position: "relative", background: "#0a0f2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}
      >
        {/* Header */}
        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(239,68,68,0.5)" }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(234,179,8,0.5)" }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(34,197,94,0.5)" }} />
          </div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#6c7299" }}>clevs-studio.vercel.app</div>
          <span style={{ fontSize: 11, color: "#4ade80", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            concept livrat
          </span>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 6, padding: "12px 16px 0" }}>
          {(["website", "motion"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                background: tab === t ? (t === "website" ? "#4f8eff" : "#8b5cf6") : "rgba(255,255,255,0.06)",
                color: tab === t ? "#050818" : "#6c7299",
                transition: "all 0.2s",
              }}
            >
              {t === "website" ? "Website" : "Motion Video"}
            </button>
          ))}
        </div>

        <div style={{ padding: "16px 20px 20px" }}>
          {/* Label */}
          <div style={{ fontSize: 10, color: "#6c7299", fontFamily: "monospace", marginBottom: 6, letterSpacing: "0.08em" }}>PENTRU</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#f5f7ff", marginBottom: 16 }}>
            {tab === "website" ? "Cristina Beauty Studio" : "FitLife Gym"}
          </div>

          {tab === "website" ? (
            <>
              {/* Website preview */}
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#4f8eff", fontFamily: "monospace", marginBottom: 8, letterSpacing: "0.08em" }}>01 / DESIGN PROPUS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {["Hero section", "Servicii", "Galerie", "Contact"].map((s) => (
                    <div key={s} style={{ height: 36, background: "rgba(79,142,255,0.08)", borderRadius: 8, display: "flex", alignItems: "center", paddingLeft: 8, fontSize: 11, color: "#6c7299" }}>{s}</div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 10, color: "#4f8eff", fontFamily: "monospace", marginBottom: 10, letterSpacing: "0.08em" }}>02 / PALETA DE CULORI</div>
                <div style={{ filter: "blur(4px)", userSelect: "none" }}>
                  <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 6, marginBottom: 8, width: "90%" }} />
                  <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 6, width: "70%" }} />
                </div>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Link href="/concept/start" style={{ background: "#4f8eff", color: "#050818", fontWeight: 600, fontSize: 11, padding: "7px 14px", borderRadius: 8, textDecoration: "none" }}>
                    Vreau conceptul gratuit →
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Motion preview */}
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#8b5cf6", fontFamily: "monospace", marginBottom: 8, letterSpacing: "0.08em" }}>01 / TIMELINE MOTION</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[40, 70, 55, 90, 60, 80, 45, 65].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: h / 4, background: `rgba(139,92,246,${0.3 + i * 0.05})`, borderRadius: 3, alignSelf: "flex-end" }} />
                  ))}
                </div>
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: 9, color: "#6c7299" }}>
                  <span>0:00</span><span>0:10</span>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 10, color: "#8b5cf6", fontFamily: "monospace", marginBottom: 10, letterSpacing: "0.08em" }}>02 / CONCEPT VIZUAL</div>
                <div style={{ filter: "blur(4px)", userSelect: "none" }}>
                  <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 6, marginBottom: 8, width: "85%" }} />
                  <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 6, width: "65%" }} />
                </div>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Link href="/concept/start" style={{ background: "#8b5cf6", color: "#f5f7ff", fontWeight: 600, fontSize: 11, padding: "7px 14px", borderRadius: 8, textDecoration: "none" }}>
                    Vreau conceptul gratuit →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── Mobile Preview Card ────────────────────────────────────────────────────────

function MobileConceptPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative mt-8 rounded-2xl overflow-hidden"
      style={{ background: "#0a0f2a", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(139,92,246,0.1)", filter: "blur(30px)", pointerEvents: "none" }} />
      <div style={{ position: "relative", padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#f5f7ff" }}>Studio Concept</span>
        <span style={{ fontSize: 10, color: "#4ade80", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          livrat
        </span>
      </div>
      <div style={{ position: "relative", padding: "14px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
          <div style={{ background: "rgba(79,142,255,0.08)", borderRadius: 10, padding: "12px", border: "1px solid rgba(79,142,255,0.2)" }}>
            <div style={{ fontSize: 10, color: "#4f8eff", fontFamily: "monospace", marginBottom: 6 }}>WEBSITE</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f5f7ff" }}>Design + Deploy</div>
          </div>
          <div style={{ background: "rgba(139,92,246,0.08)", borderRadius: 10, padding: "12px", border: "1px solid rgba(139,92,246,0.2)" }}>
            <div style={{ fontSize: 10, color: "#8b5cf6", fontFamily: "monospace", marginBottom: 6 }}>MOTION</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f5f7ff" }}>Video animat</div>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 14px", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: 9, color: "#6c7299", fontFamily: "monospace", marginBottom: 8 }}>CONCEPTUL TĂU GRATUIT</div>
          <div style={{ filter: "blur(3px)", userSelect: "none" }}>
            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, width: "80%", marginBottom: 5 }} />
            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, width: "60%" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Link href="/concept/start" style={{ background: "linear-gradient(135deg, #4f8eff, #8b5cf6)", color: "#f5f7ff", fontWeight: 600, fontSize: 11, padding: "7px 14px", borderRadius: 8, textDecoration: "none" }}>
              Vreau conceptul →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Pain Points ────────────────────────────────────────────────────────────────

function IconGlobe() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
}
function IconEye() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}
function IconPlay() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
}
function IconStar() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
function IconTrend() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
}
function IconZap() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
}

const PAINS = [
  { icon: <IconGlobe />, title: "Invizibil pe Google", desc: "Fără site, nu exiști. Clienții caută online și găsesc concurența.", stat: "78%", statLabel: "din cumpărători caută online înainte" },
  { icon: <IconEye />, title: "Prima impresie ratată", desc: "Un site vechi sau urât transmite că nu ești serios. Clientul pleacă în 3 secunde.", stat: "94%", statLabel: "din prime impresii sunt despre design" },
  { icon: <IconPlay />, title: "Content plat, zero engagement", desc: "Poze statice în 2026 = ignorat. Motion video-urile au 3× mai mult engagement.", stat: "3×", statLabel: "mai mult engagement cu video față de imagine" },
  { icon: <IconStar />, title: "Concurența arată mai bine", desc: "Dacă ei au un site frumos și tu nu, banii merg la ei. Simplu.", stat: "2 din 3", statLabel: "clienți aleg afacerea care arată mai profesional" },
  { icon: <IconTrend />, title: "Identitate vizuală slabă", desc: "Fără brand coerent, nu poți cere prețuri mari. Arată amateurism.", stat: "33%", statLabel: "prețuri mai mici percepute fără brand clar" },
  { icon: <IconZap />, title: "Fără prezență socială", desc: "Fără video content, algoritmii nu te ajută. Ești de găsit doar de cei care te știu deja.", stat: "6×", statLabel: "mai mult reach organic cu video vs text" },
  { icon: <IconStar />, title: "Fără Google Reviews", desc: "Recenziile influențează 93% din decizii. Fără prezență digitală, pierzi înainte să înceapă.", stat: "93%", statLabel: "din decizii influențate de recenzii online" },
  { icon: <IconTrend />, title: "Zero lead-uri noi", desc: "Un site optimizat lucrează 24/7 pentru tine. Fără el, clienții nu te găsesc niciodată.", stat: "24/7", statLabel: "un site bun generează lead-uri non-stop" },
  { icon: <IconGlobe />, title: "Costă mai mult să recuperezi", desc: "Cu cât aștepți, cu atât concurența se instalează mai solid. Momentul optim e acum.", stat: "2×", statLabel: "mai greu să recâștigi piața după ce ai pierdut-o" },
];

// ── Steps ──────────────────────────────────────────────────────────────────────

const STEPS = [
  { num: "01", title: "Completezi formularul", desc: "2 minute. Tipul de concept (website sau motion), domeniul și câteva preferințe.", color: "rgba(79,142,255," },
  { num: "02", title: "Noi creăm conceptul", desc: "Pe baza răspunsurilor tale, pregătim un concept personalizat. Nu un template generic.", color: "rgba(139,92,246," },
  { num: "03", title: "Primești conceptul", desc: "Pe email sau WhatsApp, direct de la Alexandru. Fără obligații, fără presiune.", color: "rgba(249,115,22," },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <WatercolorBackground />

      <main className="relative z-10 flex flex-col items-center w-full overflow-x-hidden">

        {/* HEADER */}
        <header className="w-full max-w-6xl px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/clevs-studio-logo.png"
              alt="Clevs Studio"
              width={140}
              height={40}
              style={{ objectFit: "contain", mixBlendMode: "lighten" }}
            />
          </Link>
          <nav className="hidden sm:flex items-center gap-7 text-sm">
            <a href="#servicii" className="text-foreground-muted hover:text-foreground transition">Servicii</a>
            <a href="#de-ce-conteaza" className="text-foreground-muted hover:text-foreground transition">De ce contează</a>
            <a href="#cum-functioneaza" className="text-foreground-muted hover:text-foreground transition">Cum funcționează</a>
            <Link href="/concept/start" className="text-accent hover:text-accent-hover font-medium transition">Concept gratuit →</Link>
          </nav>
          <Link
            href="/concept/start"
            className="sm:hidden text-xs font-semibold text-accent px-3 py-2 rounded-lg transition"
            style={{ border: "1px solid rgba(79,142,255,0.35)", background: "rgba(79,142,255,0.08)" }}
          >
            Concept gratuit →
          </Link>
        </header>

        {/* HERO */}
        <section className="w-full max-w-6xl px-4 sm:px-6 pt-8 sm:pt-14 pb-12 sm:pb-20 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-strong bg-surface text-xs text-foreground-muted mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Website design · Motion video · Concept gratuit
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.04] mb-5">
              Dă viață
              <br />
              <span className="gradient-studio">brandului tău.</span>
            </h1>

            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-7 max-w-lg">
              Website <GlowWord delay={0}>profesional</GlowWord> sau video{" "}
              <GlowWord delay={0.8} color="#8b5cf6">motion</GlowWord> animat —
              primești un <GlowWord delay={1.6} color="#f97316">concept gratuit</GlowWord>{" "}
              fără nicio obligație.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-10">
              <Link href="/concept/start" className="btn-primary text-base group">
                Vreau concept gratuit
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a href="#cum-functioneaza" className="btn-secondary text-base">Cum funcționează</a>
            </div>

            <div className="flex items-center gap-4 sm:gap-5 text-xs text-foreground-dim">
              <span>✓ Fără card</span>
              <span>✓ Fără spam</span>
              <span>✓ Livrat personal</span>
            </div>

            <div className="lg:hidden">
              <MobileConceptPreview />
            </div>
          </motion.div>

          <div className="hidden lg:block">
            <StudioConceptCard />
          </div>
        </section>

        {/* LIVE TICKER */}
        <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <LiveTicker />
            <div className="hidden sm:flex items-center gap-2 text-xs text-foreground-dim flex-shrink-0">
              <span className="font-semibold text-foreground">34</span> concepte livrate luna aceasta
            </div>
            <div className="sm:hidden flex items-center gap-1 text-xs text-foreground-dim flex-shrink-0">
              <span className="font-semibold text-foreground">34</span> livrate
            </div>
          </div>
        </div>

        {/* PAIN SECTION */}
        <section id="de-ce-conteaza" className="w-full py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12"
          >
            <div className="text-accent font-mono text-xs tracking-widest mb-4">DE CE CONTEAZĂ</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl">
              Ce te costă să nu
              <br />arăți bine.
            </h2>
          </motion.div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {PAINS.map((pain, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.07 }}
                  className="card pain-card hover:border-border-strong transition-all duration-300"
                  style={i >= 6 ? { opacity: 0.2, filter: "blur(3px)", pointerEvents: "none", userSelect: "none" } : undefined}
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-accent mb-3 sm:mb-4" style={{ background: "rgba(79,142,255,0.1)", border: "1px solid rgba(79,142,255,0.2)" }}>
                    {pain.icon}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">{pain.stat}</div>
                  <div className="text-[10px] sm:text-xs text-foreground-dim mb-2 sm:mb-4 leading-tight">{pain.statLabel}</div>
                  <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">{pain.title}</h3>
                  <p className="text-foreground-muted text-xs sm:text-sm leading-relaxed hidden sm:block">{pain.desc}</p>
                  <p className="text-foreground-muted text-[11px] leading-snug sm:hidden">{pain.desc.split(".")[0]}.</p>
                </motion.div>
              ))}
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to top, #050818 25%, rgba(5,8,24,0.75) 60%, transparent 100%)", pointerEvents: "none" }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-6 px-4"
          >
            <Link
              href="/concept/start"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent border px-6 py-3 rounded-xl hover:bg-accent/10 transition"
              style={{ borderColor: "rgba(79,142,255,0.3)" }}
            >
              Obține conceptul tău gratuit
              <span>→</span>
            </Link>
            <p className="text-xs text-foreground-dim mt-3">Website sau motion video · gratuit · fără obligații</p>
          </motion.div>
        </section>

        {/* HOW IT WORKS */}
        <section id="cum-functioneaza" className="w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14"
          >
            <div className="text-accent font-mono text-xs tracking-widest mb-4">CUM FUNCȚIONEAZĂ</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">3 pași.</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Desktop connector */}
            <div className="hidden sm:block absolute" style={{ top: 28, left: "18%", right: "18%", height: 1, background: "rgba(139,92,246,0.12)", overflow: "hidden" }}>
              <motion.div
                style={{ position: "absolute", top: 0, left: 0, width: 80, height: "100%", background: "linear-gradient(to right, transparent, rgba(139,92,246,0.9), transparent)" }}
                animate={{ x: ["-80px", "calc(100% + 80px)"] }}
                transition={{ duration: 3, delay: 0.4, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
              />
            </div>

            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {i > 0 && (
                  <div className="sm:hidden flex justify-start mb-4 ml-7" style={{ height: 32, width: 1, background: "rgba(139,92,246,0.15)", position: "relative", overflow: "hidden" }}>
                    <motion.div
                      style={{ position: "absolute", top: 0, left: 0, right: 0, height: 16, background: "linear-gradient(to bottom, rgba(139,92,246,0.8), transparent)" }}
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 1.2, delay: i * 1.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                    />
                  </div>
                )}
                <PulsingStep num={step.num} stepIndex={i} color={step.color} />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SERVICE CARDS */}
        <section id="servicii" className="w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14"
          >
            <div className="text-accent font-mono text-xs tracking-widest mb-4">SERVICII</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-xl">
              Două servicii.
              <br />
              <span className="gradient-studio-2">Un singur brand.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Website card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ background: "#0a0f2a", border: "1px solid rgba(79,142,255,0.2)", padding: "32px" }}
            >
              <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "60%", background: "radial-gradient(circle, rgba(79,142,255,0.08), transparent 70%)", pointerEvents: "none" }} />
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-accent mb-5"
                  style={{ background: "rgba(79,142,255,0.1)", border: "1px solid rgba(79,142,255,0.25)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <a
                  href="https://oferta-tan.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold mb-5 px-3 py-1.5 rounded-lg transition"
                  style={{ background: "rgba(79,142,255,0.1)", border: "1px solid rgba(79,142,255,0.3)", color: "#4f8eff" }}
                >
                  Oferta noastră →
                </a>
                <h3 className="text-2xl font-bold mb-3">Website Design</h3>
                <p className="text-foreground-muted text-sm leading-relaxed mb-6">
                  Un site care lucrează pentru tine — design custom, vizibil pe Google, cu sisteme integrate. Plată unică, fără abonament. Pachete de la <span className="text-foreground font-medium">€150 la €250</span>.
                </p>
                <ul className="space-y-2 text-sm text-foreground-muted mb-8">
                  {["Design 100% personalizat", "5–7 pagini complete", "Animații & efecte vizuale", "SEO + indexare Google", "Sisteme integrate (rezervări, programări)", "Livrare în 48–72 ore"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-accent text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/concept/start?service=website" className="btn-primary text-sm inline-flex group">
                  Concept gratuit de site →
                </Link>
              </div>
            </motion.div>

            {/* Motion card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ background: "#0a0f2a", border: "1px solid rgba(139,92,246,0.2)", padding: "32px" }}
            >
              <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "60%", background: "radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)", pointerEvents: "none" }} />
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", color: "#8b5cf6" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <a
                  href="https://oferta-tan.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold mb-5 px-3 py-1.5 rounded-lg transition"
                  style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", color: "#8b5cf6" }}
                >
                  Oferta noastră →
                </a>
                <h3 className="text-2xl font-bold mb-3">Motion Video</h3>
                <p className="text-foreground-muted text-sm leading-relaxed mb-6">
                  Motion grafică cinematică — creat complet de la zero sau montat pe footage-ul tău. Voiceover profesional, sound design, gata pentru ads, social media sau prezentări.
                </p>
                <ul className="space-y-2 text-sm text-foreground-muted mb-8">
                  {["Motion graphics animate", "De la zero sau pe footage-ul tău", "Voiceover profesional", "Sound design (SFX)", "Formate pentru orice platformă", "Storyboard & concept inclus"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span style={{ color: "#8b5cf6" }} className="text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/concept/start?service=motion"
                  className="btn-primary text-sm inline-flex group"
                  style={{ background: "#8b5cf6" }}
                >
                  Concept motion gratuit →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="w-full max-w-4xl px-4 sm:px-6 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div style={{ position: "absolute", inset: 0, background: "rgba(139,92,246,0.07)", filter: "blur(60px)", borderRadius: "50%" }} />
              <div className="relative card py-10 px-5 sm:py-16 sm:px-8" style={{ borderColor: "rgba(139,92,246,0.2)" }}>
                <div className="text-accent font-mono text-xs tracking-widest mb-5 sm:mb-6">CONCEPTUL TĂU</div>
                <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                  Vrei să vezi cum{" "}
                  <br />
                  <span className="gradient-studio">
                    arată brandul tău?
                  </span>
                </h2>
                <p className="text-foreground-muted text-base sm:text-lg mb-8 sm:mb-10 max-w-lg mx-auto">
                  2 minute de completat. Concept personalizat livrat direct pe email sau WhatsApp. Gratuit, fără obligații.
                </p>
                <Link href="/concept/start" className="btn-primary text-base sm:text-lg group inline-flex">
                  Vreau concept gratuit
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-foreground-dim">
                  <span>✓ Fără cont, fără card</span>
                  <span>✓ Website sau motion video</span>
                  <span>✓ Livrat personal de Alexandru</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground-dim">
            <div className="flex items-center gap-2">
              <Image src="/clevs-studio-logo.png" alt="Clevs Studio" width={90} height={26} style={{ objectFit: "contain", mixBlendMode: "lighten" }} />
              <span>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <a href="mailto:clevs.contact@gmail.com" className="hover:text-foreground transition">clevs.contact@gmail.com</a>
              <a href="tel:0724863448" className="hover:text-foreground transition">0724 863 448</a>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
