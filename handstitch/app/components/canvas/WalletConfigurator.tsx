"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WalletCanvas from "./WalletCanvas";
import { useTranslations } from "next-intl";
import type { PartId, WalletConfig } from "./WalletModel";

/**
 * ✅ Parts you can add to the wallet.
 * For drag/drop (desktop) + tap-to-add (mobile).
 */
const DRAG_ITEMS: { id: PartId; labelKey: string }[] = [
  { id: "CARD_HOLDER_1", labelKey: "parts.CARD_HOLDER_1" },
  { id: "CARD_HOLDER_2", labelKey: "parts.CARD_HOLDER_2" },
  { id: "CARD_HOLDER_3", labelKey: "parts.CARD_HOLDER_3" },
  { id: "CARD_HOLDER_4", labelKey: "parts.CARD_HOLDER_4" },
  { id: "MONEY_POCKET", labelKey: "parts.MONEY_POCKET" },
];

type Gender = "men" | "women";
type StepId = 0 | 1 | 2 | 3 | 4;

const stepHeaderVariants = {
  open: { opacity: 1, height: "auto" as const },
  closed: { opacity: 0, height: 0 as const },
};

const stepBodyVariants = {
  open: { opacity: 1, height: "auto" as const },
  closed: { opacity: 0, height: 0 as const },
};

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function WalletConfigurator() {
  const t = useTranslations("configurator");

  // Desktop vs Mobile behavior
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Canvas view
  const [activeView, setActiveView] = useState("front");

  // Current open step
  const [step, setStep] = useState<StepId>(0);

  // Configuration State
  const [gender, setGender] = useState<Gender | null>(null);
  const [baseModel, setBaseModel] = useState<string | null>(null);
  const [config, setConfig] = useState<WalletConfig>({ enabled: {} });
  const [stitching, setStitching] = useState<string | null>(null);

  const views = [
    { key: "front", label: t("views.front") },
    { key: "back", label: t("views.back") },
    { key: "detail", label: t("views.detail") },
    { key: "360", label: t("views.360") },
  ];

  const enabledList = useMemo(
    () => (Object.keys(config.enabled) as PartId[]).filter((k) => !!config.enabled[k]),
    [config.enabled]
  );

  const enablePart = (id: PartId) => {
    setConfig((prev) => ({
      ...prev,
      enabled: { ...prev.enabled, [id]: true },
    }));
  };

  const removePart = (id: PartId) => {
    setConfig((prev) => ({
      ...prev,
      enabled: { ...prev.enabled, [id]: false },
    }));
  };

  // ---- Drag/Drop
  const onDragStart = (e: React.DragEvent, id: PartId) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "copy";
  };

  const onDragOverCanvas = (e: React.DragEvent) => {
    if (isMobile) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDropOnCanvas = (e: React.DragEvent) => {
    if (isMobile) return;
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") as PartId;
    if (!id) return;
    enablePart(id);
  };

  // Step completion helpers
  const step0Done = gender !== null;
  const step1Done = baseModel !== null;
  const step2Done = enabledList.length > 0;
  const step3Done = stitching !== null;
  const allMainStepsDone = step0Done && step1Done && step2Done && step3Done;

  // Soft Auto-advance: only move forward when a step becomes "done" for the first time
  // It opens the next one, but doesn't "lock" the current one from being reopened.
  useEffect(() => {
    if (step === 0 && step0Done) setStep(1);
  }, [step0Done]); // remove 'step' dependency to only trigger once when step0Done flips

  useEffect(() => {
    if (step === 1 && step1Done) setStep(2);
  }, [step1Done]);

  useEffect(() => {
    if (step === 2 && step2Done) setStep(3);
  }, [step2Done]);

  useEffect(() => {
    // When last main step is done, we don't auto-open 4 immediately to let user see selection
    // But if they click "Confirm Selection", we move to 4.
  }, [step3Done]);

  const StepShell = ({
    id,
    title,
    subtitle,
    children,
    done,
  }: {
    id: StepId;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    done: boolean;
  }) => {
    // Step 3 (Stitching) remains expanded by default (unless user is in review step 4)
    const isOpen = step === id || (id === 3 && step !== 4);

    return (
      <div
        className={cx(
          "rounded-2xl border transition-all duration-500 overflow-hidden",
          isOpen
            ? "border-[#d0a87a]/40 bg-white/[0.08] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
        )}
      >
        <button
          type="button"
          onClick={() => setStep(id)}
          className={cx(
            "w-full text-left flex items-start justify-between gap-4 p-5 md:p-6 transition-all",
            !isOpen && "cursor-pointer"
          )}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <span
                className={cx(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full border text-[12px] font-bold transition-all duration-300",
                  done
                    ? "border-[#d0a87a] bg-[#d0a87a] text-[#0b0a09] shadow-[0_0_15px_rgba(208,168,122,0.3)]"
                    : isOpen
                      ? "border-white bg-white text-[#0b0a09]"
                      : "border-white/20 bg-transparent text-white/40"
                )}
              >
                {id + 1}
              </span>
              <div>
                <p className={cx(
                  "text-[15px] font-medium tracking-tight transition-colors",
                  isOpen ? "text-white" : "text-white/60"
                )}>
                  {title}
                </p>
                {done && !isOpen && (
                  <p className="text-[10px] text-[#d0a87a] uppercase tracking-[0.1em] mt-0.5 font-bold">
                    {t("done")}
                  </p>
                )}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && subtitle ? (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-[13px] text-white/50 leading-relaxed max-w-sm"
                >
                  {subtitle}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 mt-1">
            {done && !isOpen ? (
              <div className="h-6 w-6 rounded-full bg-[#d0a87a]/20 flex items-center justify-center border border-[#d0a87a]/30">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="text-[#d0a87a]">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : (
              <svg
                className={cx("w-4 h-4 transition-transform duration-300 text-white/20", isOpen && "rotate-180")}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={stepBodyVariants}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="px-5 md:px-6 pb-6"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
      {/* LEFT — 3D CANVAS */}
      <div
        onDragOver={onDragOverCanvas}
        onDrop={onDropOnCanvas}
        className="rounded-[2.5rem] overflow-hidden relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] group transition-all duration-700 hover:border-[#d0a87a]/20"
      >
        <div className="h-[580px] md:h-[720px]">
          <WalletCanvas activeView={activeView} config={config} />
        </div>

        {/* View Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-2xl">
          {views.map((view) => (
            <button
              key={view.key}
              onClick={() => setActiveView(view.key)}
              className={cx(
                "px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300",
                activeView === view.key
                  ? "bg-white text-[#0b0a09] shadow-[0_8px_20px_rgba(255,255,255,0.2)] scale-105"
                  : "bg-transparent text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {view.label}
            </button>
          ))}
        </div>

        {!isMobile && (
          <div className="pointer-events-none absolute top-8 left-8 hidden md:block">
            <div className="rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d0a87a]">
              {t("drag_to_add")}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — STEPS PANEL */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-2xl font-serif italic text-white tracking-tight">{t("customize")}</h2>
            <div className="h-px w-12 bg-[#d0a87a]/40 mt-2" />
          </div>
          <button
            onClick={() => {
              setGender(null);
              setBaseModel(null);
              setConfig({ enabled: {} });
              setStitching(null);
              setStep(0);
            }}
            className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/30 hover:text-[#ef4444] transition-colors flex items-center gap-2"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("reset")}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* STEP 1: GENDER */}
          <StepShell
            id={0}
            title={t("steps.gender.title")}
            subtitle={t("steps.gender.subtitle")}
            done={step0Done}
          >
            <div className="grid grid-cols-2 gap-3">
              {(["men", "women"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={cx(
                    "rounded-xl border-2 py-5 text-[13px] font-bold transition-all duration-300 uppercase tracking-widest",
                    gender === g
                      ? "border-[#d0a87a] bg-[#d0a87a] text-[#0b0a09] shadow-[0_10px_30px_rgba(208,168,122,0.2)]"
                      : "border-white/5 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
                  )}
                >
                  {t(`steps.gender.${g}`)}
                </button>
              ))}
            </div>
          </StepShell>

          {/* STEP 2: BASE */}
          <StepShell
            id={1}
            title={t("steps.base.title")}
            subtitle={t("steps.base.subtitle")}
            done={step1Done}
          >
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setBaseModel("classic_v1")}
                className={cx(
                  "w-full rounded-xl border-2 px-6 py-5 text-left flex items-center justify-between group transition-all duration-300",
                  baseModel === "classic_v1"
                    ? "border-[#d0a87a] bg-[#d0a87a] text-[#0b0a09]"
                    : "border-white/5 bg-white/5 text-white hover:border-white/20"
                )}
              >
                <span className="font-bold tracking-tight">{t("steps.base.classic")}</span>
                <span className={cx(
                  "text-[10px] uppercase font-bold tracking-[0.2em]",
                  baseModel === "classic_v1" ? "opacity-60" : "text-[#d0a87a]"
                )}>{t("selected")}</span>
              </button>

              <div className="rounded-xl border border-dashed border-white/10 p-5 text-center opacity-40">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
                  {t("steps.base.coming_soon")}
                </span>
              </div>
            </div>
          </StepShell>

          {/* STEP 3: PARTS */}
          <StepShell
            id={2}
            title={t("steps.parts.title")}
            subtitle={isMobile ? t("steps.parts.tap") : t("steps.parts.drag")}
            done={step2Done}
          >
            <div className="space-y-3">
              {DRAG_ITEMS.map((it) => {
                const enabled = !!config.enabled[it.id];
                return (
                  <div key={it.id} className="flex gap-3">
                    <div
                      draggable={!isMobile}
                      onDragStart={(e) => onDragStart(e, it.id)}
                      onClick={() => isMobile && (enabled ? removePart(it.id) : enablePart(it.id))}
                      className={cx(
                        "flex-1 rounded-xl border-2 px-6 py-4 text-[13px] font-bold transition-all duration-300 uppercase tracking-wider",
                        enabled
                          ? "border-[#d0a87a] bg-[#d0a87a]/10 text-white shadow-[0_4px_20px_rgba(208,168,122,0.1)]"
                          : "border-white/5 bg-white/5 text-white/60 hover:border-white/20 hover:text-white",
                        !isMobile && "cursor-grab active:cursor-grabbing",
                        isMobile && "cursor-pointer"
                      )}
                    >
                      {t(it.labelKey as any)}
                    </div>
                    {enabled && (
                      <button
                        onClick={() => removePart(it.id)}
                        className="px-4 rounded-xl border-2 border-white/5 text-[#ef4444] hover:bg-[#ef4444]/10 hover:border-[#ef4444]/30 transition-all font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active parts summary */}
            <AnimatePresence>
              {enabledList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-4">
                    {t("active_parts")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {enabledList.map(id => (
                      <span key={id} className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-bold border border-white/5 uppercase tracking-wider">
                        {t(`parts.${id}` as any)}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </StepShell>

          {/* STEP 4: STITCHING */}
          <StepShell
            id={3}
            title={t("steps.stitch.title")}
            subtitle={t("steps.stitch.subtitle")}
            done={step3Done}
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "stitch_white", label: t("steps.stitch.white"), color: "#f5f5f5" },
                { key: "stitch_black", label: t("steps.stitch.black"), color: "#1c1917" },
                { key: "stitch_brown", label: t("steps.stitch.brown"), color: "#8c5b3f" },
                { key: "stitch_red", label: t("steps.stitch.red"), color: "#9e2a2b" },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setStitching(s.key)}
                  className={cx(
                    "group rounded-xl border-2 px-5 py-4 text-left transition-all duration-300",
                    stitching === s.key
                      ? "border-[#d0a87a] bg-[#d0a87a]/10 text-white shadow-[0_4px_20px_rgba(208,168,122,0.1)]"
                      : "border-white/5 bg-white/5 text-white/50 hover:border-white/20 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full border border-white/20 shadow-lg" style={{ backgroundColor: s.color }} />
                    <span className="text-[13px] font-bold uppercase tracking-tight">{s.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              disabled={!allMainStepsDone}
              onClick={() => setStep(4)}
              className="w-full mt-8 rounded-xl bg-[#d0a87a] text-[#0b0a09] py-5 text-[12px] font-bold uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(208,168,122,0.3)] hover:bg-[#e4be91] hover:shadow-[0_25px_50px_-12px_rgba(208,168,122,0.4)] disabled:opacity-20 disabled:grayscale transition-all transform active:scale-[0.98]"
            >
              {t("review_order")}
            </button>
          </StepShell>

          {/* STEP 5: FINAL REVIEW */}
          <StepShell
            id={4}
            title={t("steps.review.title")}
            subtitle={t("steps.review.subtitle")}
            done={false}
          >
            <div className="bg-white/[0.03] rounded-[1.5rem] p-6 border border-white/5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d0a87a] mb-6">
                {t("steps.review.config_details")}
              </h4>

              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">{t("steps.gender.title")}</span>
                  <span className="text-sm font-medium text-white">{gender ? t(`steps.gender.${gender}`) : "—"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">{t("steps.base.title")}</span>
                  <span className="text-sm font-medium text-white">{baseModel === "classic_v1" ? t("steps.base.classic") : "—"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">{t("active_parts")}</span>
                  <span className="text-sm font-medium text-[#d0a87a]">{enabledList.length} {t("units")}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">{t("steps.stitch.title")}</span>
                  <span className="text-sm font-medium text-white">{stitching ? t(`steps.stitch.${stitching.replace("stitch_", "")}` as any) : "—"}</span>
                </div>
              </div>

              {!allMainStepsDone && (
                <p className="mt-8 text-[10px] text-[#ef4444] font-bold uppercase tracking-[0.3em] text-center bg-[#ef4444]/10 py-3 rounded-lg border border-[#ef4444]/20">
                  {t("steps.review.completion_notice")}
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 mt-8">
                <button
                  disabled={!allMainStepsDone}
                  className="bg-white text-[#0b0a09] py-5 rounded-xl font-bold uppercase tracking-[0.3em] text-[12px] shadow-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-20"
                >
                  {t("confirm")}
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] text-white/30 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t("edit")}
                </button>
              </div>
            </div>
          </StepShell>
        </div>
      </div>
    </section>
  );
}
