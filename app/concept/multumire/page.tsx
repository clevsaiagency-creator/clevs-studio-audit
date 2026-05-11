"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import WatercolorBackground from "@/components/WatercolorBackground";

export default function MultumirePage() {
  useEffect(() => {
    const fire = (origin: { x: number; y: number }, particleCount: number) => {
      confetti({
        particleCount,
        spread: 80,
        startVelocity: 35,
        origin,
        colors: ["#4f8eff", "#8b5cf6", "#f97316", "#ec4899", "#ffffff", "#fbbf24"],
        scalar: 1.1,
        ticks: 200,
      });
    };

    fire({ x: 0.5, y: 0.5 }, 120);
    setTimeout(() => fire({ x: 0.2, y: 0.55 }, 60), 200);
    setTimeout(() => fire({ x: 0.8, y: 0.55 }, 60), 350);
    setTimeout(() => fire({ x: 0.5, y: 0.45 }, 80), 700);
  }, []);

  return (
    <>
      <WatercolorBackground />

      <main className="relative z-10 min-h-screen flex flex-col items-center">
        <header className="w-full max-w-6xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-foreground">
            <Image src="/clevs-studio-logo.png" alt="Clevs Studio" width={28} height={28} style={{ objectFit: "contain", mixBlendMode: "lighten" }} />
            <span className="font-bold text-base">Clevs Studio</span>
          </Link>
        </header>

        <section className="flex-1 flex items-center justify-center px-6 pb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #4f8eff, #8b5cf6, #f97316)",
                boxShadow: "0 0 60px rgba(139,92,246,0.5)",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-background" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <motion.path d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.1]"
            >
              Mulțumim că ai ales{" "}
              <span style={{ background: "linear-gradient(135deg, #4f8eff, #8b5cf6, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Clevs Studio!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-lg sm:text-xl text-foreground-muted mb-10 max-w-xl mx-auto"
            >
              Conceptul tău va fi livrat în cel mai scurt timp. Te vom contacta direct pe email sau WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="card text-left max-w-md mx-auto mb-10"
            >
              <div className="text-sm text-foreground-muted mb-4">Ce urmează:</div>
              <div className="space-y-4">
                {[
                  "Analizăm cererea ta",
                  "Pregătim conceptul personalizat",
                  "Alexandru te contactează direct",
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono"
                      style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", color: "#8b5cf6" }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-foreground">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="text-sm text-foreground-dim italic"
            >
              Conceptul gratuit este o previzualizare creativă și nu reprezintă produsul final livrat.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="text-sm text-foreground-dim mt-3"
            >
              Întrebări? Scrie-ne la{" "}
              <a href="mailto:clevs.contact@gmail.com" className="text-accent hover:text-accent-hover transition">
                clevs.contact@gmail.com
              </a>
            </motion.p>
          </motion.div>
        </section>
      </main>
    </>
  );
}
