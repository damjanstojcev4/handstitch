// cnvas/WalletConfigurator.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import WalletCanvas from "./WalletCanvas";
import type { PartId, WalletConfig } from "./WalletModel";

// Helper for Tailwind classes
const cx = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const views = [
  { key: "front", label: "Front" },
  { key: "back", label: "Back" },
  { key: "detail", label: "Detail" },
  { key: "360", label: "360" },
] as const;

const STITCH_OPTIONS = [
  { key: "black", label: "Midnight Black", color: "#1A1A1A" },
  { key: "brown", label: "Saddle Brown", color: "#4B2C20" },
  { key: "tan", label: "Classic Tan", color: "#B38B6D" },
  { key: "creme", label: "Vanilla Creme", color: "#F5F5DC" },
];

const DRAG_ITEMS: { id: PartId; label: string }[] = [
  { id: "CARD_HOLDER_1", label: "Card Slot 1" },
  { id: "CARD_HOLDER_2", label: "Card Slot 2" },
  { id: "CARD_HOLDER_3", label: "Card Slot 3" },
  { id: "CARD_HOLDER_4", label: "Card Slot 4" },
  { id: "MONEY_POCKET", label: "Money Pocket" },
];

function StepShell({
  title,
  done,
  className,
  children,
}: {
  title: string;
  done: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "p-6 border transition-all duration-500",
        done ? "border-white/5 bg-white/[0.02]" : "border-white/20 bg-white/[0.05]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {title}
          </h3>
        </div>
      </div>
      {children}
    </div>
  );
}

function ReviewButton({
  disabled,
  label,
  className,
}: {
  disabled: boolean;
  label: string;
  className?: string;
}) {
  return (
    <button
      disabled={disabled}
      className={cx(
        "w-full bg-white text-black uppercase tracking-[0.3em] text-[11px] transition-all",
        disabled
          ? "opacity-30 bg-transparent text-white/20 border border-white/10 cursor-not-allowed"
          : "hover:bg-zinc-200 active:scale-[0.98]",
        className
      )}
    >
      {label}
    </button>
  );
}

export default function WalletConfigurator() {
  const t = useTranslations("configurator");

  const [activeView, setActiveView] = useState<string>("front");
  const [gender, setGender] = useState<string | null>(null);
  const [baseModel, setBaseModel] = useState<string | null>(null);
  const [config, setConfig] = useState<WalletConfig>({ enabled: {} });
  const [stitching, setStitching] = useState<string | null>(null);

  const resetConfig = () => {
    setGender(null);
    setBaseModel(null);
    setConfig({ enabled: {} });
    setStitching(null);
    setActiveView("front");
  };

  const togglePart = (id: PartId) => {
    setConfig((prev) => ({
      ...prev,
      enabled: { ...prev.enabled, [id]: !prev.enabled[id] },
    }));
  };

  const step0Done = !!gender;
  const step1Done = !!baseModel;
  const step2Done = Object.values(config.enabled).some((v) => v);
  const step3Done = !!stitching;

  // NOTE: your old logic ignored step2; keep or change depending on your flow.
  const allMainStepsDone = step0Done && step1Done && step3Done;

  return (
    <section className="relative py-20 lg:py-32 bg-transparent">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="relative mb-16 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-semibold uppercase tracking-tighter text-white">
              {t("customize")}
            </h2>
          </div>

          <button
            onClick={resetConfig}
            className="hidden md:flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-white hover:bg-white hover:text-black transition-colors border border-white/20 px-5 py-2 rounded-full"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            {t("reset")}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Sticky Canvas */}
          <div className="lg:col-span-7 sticky top-0 lg:top-24 z-30 -mx-6 lg:mx-0">
            <div className="relative group">
              <div className="rounded-none lg:rounded-3xl overflow-hidden bg-white/[0.02] backdrop-blur-3xl border-y border-white/5 lg:border shadow-2xl transition-all duration-700 group-hover:border-white/10">
                <div className="h-[45vh] md:h-[600px] lg:h-[750px]">
                  <WalletCanvas activeView={activeView} config={config} />
                </div>

                {/* View Switcher */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/5">
                  {views.map((view) => (
                    <button
                      key={view.key}
                      onClick={() => setActiveView(view.key)}
                      className={cx(
                        "px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all",
                        activeView === view.key
                          ? "bg-white text-black"
                          : "text-white/40 hover:text-white"
                      )}
                    >
                      {view.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Config Panel */}
          <div className="lg:col-span-5 space-y-4 pt-8 lg:pt-0">
            <div className="flex flex-col gap-3">
              <StepShell
                title={t("steps.gender.title")}
                done={step0Done}
                className="bg-white/[0.03] border-white/5"
              >
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {["men", "women"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={cx(
                        "py-4 border rounded-sm text-[10px] font-semibold uppercase tracking-widest transition-all",
                        gender === g
                          ? "bg-white text-black border-white"
                          : "border-white/30 text-white/70 hover:border-white/40"
                      )}
                    >
                      {t(`steps.gender.${g}`)}
                    </button>
                  ))}
                </div>
              </StepShell>

              <StepShell
                title={t("steps.model.title")}
                done={step1Done}
                className="bg-white/[0.03] border-white/5"
              >
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {["Classic Bifold", "Slim Cardholder"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setBaseModel(m)}
                      className={cx(
                        "py-4 px-6 rounded-sm border text-left font-semibold text-[10px] uppercase tracking-widest transition-all",
                        baseModel === m
                          ? "bg-white text-black border-white"
                          : "border-white/40 text-white/70 hover:border-white/50"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </StepShell>

              <StepShell
                title={t("steps.parts.title")}
                done={step2Done}
                className="bg-white/[0.03] border-white/5"
              >
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {DRAG_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => togglePart(item.id)}
                      className={cx(
                        "flex items-center justify-between py-4 px-6 border text-left font-semibold text-[10px] uppercase tracking-widest transition-all",
                        config.enabled[item.id]
                          ? "bg-white/10 border-white text-white"
                          : "border-white/30 text-white/70 hover:border-white/40"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </StepShell>

              <StepShell
                title={t("steps.stitch.title")}
                done={step3Done}
                className="bg-white/[0.03] border-white/5"
              >
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {STITCH_OPTIONS.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setStitching(s.key)}
                      className={cx(
                        "flex items-center gap-3 p-4 border transition-all",
                        stitching === s.key
                          ? "border-white bg-white/5"
                          : "border-white/30 hover:border-white/40"
                      )}
                    >
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white">
                        {s.label}
                      </span>
                    </button>
                  ))}
                </div>
              </StepShell>
            </div>


            <div className="pt-10">
              <ReviewButton
                disabled={!allMainStepsDone}
                label={t("review_order")}
                className="py-6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating CTA */}
      <div className="lg:hidden fixed bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-50">
        <ReviewButton
          disabled={!allMainStepsDone}
          label={t("review_order")}
          className="py-5 font-black shadow-2xl"
        />
      </div>
    </section>
  );
}
