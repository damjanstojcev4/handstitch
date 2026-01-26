"use client";

import { useState } from "react";
import WalletCanvas from "./WalletCanvas";
import { useTranslations } from "next-intl";
import type { PartId, WalletConfig } from "./WalletModel";

/**
 * ✅ Drag items you can drop onto the 3D preview.
 * If you add new parts in the GLB, add them here AND in WalletModel.tsx PartId.
 */
const DRAG_ITEMS: { id: PartId; label: string }[] = [
  { id: "CARD_HOLDER_1", label: "Card Holder 1" },
  { id: "CARD_HOLDER_2", label: "Card Holder 2" },
  { id: "CARD_HOLDER_3", label: "Card Holder 3" },
  { id: "CARD_HOLDER_4", label: "Card Holder 4" },
  { id: "MONEY_POCKET", label: "Money Pocket" },
];

export default function WalletConfigurator() {
  const [activeView, setActiveView] = useState("front");
  const t = useTranslations("configurator");

  // Builder state: which parts are enabled (visible)
  const [config, setConfig] = useState<WalletConfig>({
    enabled: {
      // Start hidden by default:
      // CARD_HOLDER_1: false,
      // CARD_HOLDER_2: false,
      // CARD_HOLDER_3: false,
      // CARD_HOLDER_4: false,
      // MONEY_POCKET: false,
    },
  });

  const views = [
    { key: "front", label: t("views.front") },
    { key: "back", label: t("views.back") },
    { key: "detail", label: t("views.detail") },
    { key: "360", label: t("views.360") },
  ];

  // ---- Drag/Drop
  const onDragStart = (e: React.DragEvent, id: PartId) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "copy";
  };

  const onDragOverCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") as PartId;
    if (!id) return;

    // Enable the dropped part
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

  const enabledList = (Object.keys(config.enabled) as PartId[]).filter(
    (k) => !!config.enabled[k]
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
      {/* LEFT — 3D CANVAS (Drop Zone) */}
      <div
        onDragOver={onDragOverCanvas}
        onDrop={onDropOnCanvas}
        className="rounded-2xl overflow-hidden relative bg-white/60 backdrop-blur border border-[#e7e5e4] hover:shadow-[0_20px_60px_-20px_rgba(192,138,90,0.25)] transition-all"
      >
        <div className="h-[520px] md:h-[600px]">
          <WalletCanvas activeView={activeView} config={config} />
        </div>

        {/* View Controls Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/70 backdrop-blur-sm p-2 rounded-full border border-[#e7e5e4] shadow-lg">
          {views.map((view) => (
            <button
              key={view.key}
              onClick={() => setActiveView(view.key)}
              className={[
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                activeView === view.key
                  ? "bg-[#1c1917] text-white"
                  : "bg-transparent text-[#57534e] hover:bg-[#1c1917]/5",
              ].join(" ")}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Drop hint */}
        <div className="pointer-events-none absolute top-4 left-4 hidden md:block">
          <div className="rounded-full bg-white/70 backdrop-blur border border-[#e7e5e4] px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[#57534e]">
            Drop a part to add
          </div>
        </div>
      </div>

      {/* RIGHT — OPTIONS PANEL */}
      <div className="border border-[#e7e5e4] rounded-2xl p-5 bg-white/60 backdrop-blur flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-[#1c1917]">{t("customize")}</h2>

        {/* Drag list */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#78716c] mb-3">
            {t("drag_drop")}
          </p>

          <div className="space-y-2">
            {DRAG_ITEMS.map((it) => (
              <div
                key={it.id}
                draggable
                onDragStart={(e) => onDragStart(e, it.id)}
                className="cursor-grab active:cursor-grabbing select-none rounded-xl border border-[#e7e5e4] bg-white/70 backdrop-blur px-4 py-3 text-sm text-[#1c1917] hover:border-[#c08a5a]/50 transition"
              >
                {it.label}
              </div>
            ))}
          </div>
        </div>

        {/* Active parts */}
        <div className="pt-2 border-t border-[#e7e5e4]">
          <p className="text-xs uppercase tracking-[0.25em] text-[#78716c] mb-3">
            Active parts
          </p>

          {enabledList.length === 0 ? (
            <div className="text-sm text-[#78716c]">None selected</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {enabledList.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => removePart(id)}
                  className="rounded-full border border-[#e7e5e4] bg-white/70 backdrop-blur px-3 py-1.5 text-[12px] text-[#1c1917] hover:border-[#c08a5a]/50 transition"
                  title="Remove"
                >
                  {id} ✕
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Your placeholders */}
        <div className="border border-dashed border-[#d6d3d1] rounded-xl p-4 text-sm text-[#78716c] text-center">
          {t("materials")}
        </div>

        <div className="border border-dashed border-[#d6d3d1] rounded-xl p-4 text-sm text-[#78716c] text-center">
          {t("price")}
        </div>
      </div>
    </section>
  );
}
