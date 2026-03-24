"use client";

import { useEffect, useState } from "react";
import WalletCanvas from "./WalletCanvas";
import type {
  WalletModelData,
  Option,
  OptionValue,
  SelectionState,
  ConfigResponse,
} from "@/app/components/canvas/types";

const cx = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// ── Price calculator ───────────────────────────────────────
function calcTotal(
  basePrice: number,
  options: Option[],
  selections: SelectionState
): number {
  const adjustments = options.reduce((sum, opt) => {
    const val = selections[opt.id];
    return sum + (val?.price_adjustment ?? 0);
  }, 0);
  return basePrice + adjustments;
}

// ── Swatch button ──────────────────────────────────────────
function Swatch({
  value,
  selected,
  onClick,
}: {
  value: OptionValue;
  selected: boolean;
  onClick: () => void;
}) {
  const isLight = isLightColor(value.material_color_code);
  return (
    <button
      onClick={onClick}
      title={value.material_color_name}
      aria-pressed={selected}
      className={cx(
        "group relative p-3 border flex flex-col items-center gap-2 transition-all duration-150",
        selected ? "border-white" : "border-white/20 hover:border-white/50"
      )}
    >
      <div
        className="w-7 h-7 rounded-full border border-white/10"
        style={{ backgroundColor: value.material_color_code }}
      />
      <span className="text-[9px] uppercase tracking-wider text-white/60 group-hover:text-white/90 transition-colors leading-tight text-center">
        {value.material_color_name}
      </span>
      {selected && (
        <span className="absolute top-1.5 right-1.5">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5l2.5 2.5 3.5-4"
              stroke={isLight ? "#000" : "#fff"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────
export default function WalletConfigurator({ modelId = 1 }: { modelId?: number }) {
  const [wallet, setWallet] = useState<WalletModelData | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [selections, setSelections] = useState<SelectionState>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ordering, setOrdering] = useState(false);
  const [ordered, setOrdered] = useState(false);

  // ── Fetch from Supabase RPC ──────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_wallet_model_config`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
            },
            body: JSON.stringify({ wallet_model_id: modelId }),
          }
        );

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data: ConfigResponse = await res.json();

        setWallet(data.model);
        setOptions(data.options);

        // Auto-select first value for required options (e.g. BACK_PANEL)
        const defaults: SelectionState = {};
        data.options.forEach((opt) => {
          if (opt.is_required && opt.values.length > 0) {
            defaults[opt.id] = opt.values[0];
          } else {
            defaults[opt.id] = null;
          }
        });
        setSelections(defaults);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [modelId]);

  const selectValue = (optionId: number, value: OptionValue) => {
    setSelections((prev) => {
      // If already selected → deselect (only for non-required)
      const opt = options.find((o) => o.id === optionId);
      if (!opt?.is_required && prev[optionId]?.id === value.id) {
        return { ...prev, [optionId]: null };
      }
      return { ...prev, [optionId]: value };
    });
  };

  // ── Order submission ──────────────────────────────────────
  const handleOrder = async () => {
    if (!wallet) return;
    setOrdering(true);
    try {
      const configuration: Record<string, string> = {};
      options.forEach((opt) => {
        const val = selections[opt.id];
        if (val) configuration[opt.display_name] = val.material_color_name;
      });

      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            model_name: wallet.name,
            configuration,
            total_price: calcTotal(wallet.base_price, options, selections),
            status: "pending",
          }),
        }
      );
      setOrdered(true);
    } catch {
      alert("Failed to place order. Please try again.");
    } finally {
      setOrdering(false);
    }
  };

  // ── States ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <span className="text-white/40 text-sm uppercase tracking-widest animate-pulse">
          Loading configurator...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <span className="text-red-400 text-sm">{error}</span>
      </div>
    );
  }

  if (ordered) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center gap-4">
        <span className="text-white text-2xl font-light">Order Placed</span>
        <span className="text-white/40 text-sm">We'll be in touch soon.</span>
        <button
          onClick={() => setOrdered(false)}
          className="mt-4 text-xs uppercase tracking-widest text-white/50 hover:text-white border border-white/20 hover:border-white/50 px-6 py-2 transition-colors"
        >
          Configure Another
        </button>
      </div>
    );
  }

  const total = wallet ? calcTotal(wallet.base_price, options, selections) : 0;

  // ── Render ────────────────────────────────────────────────
  return (
    <section className="py-20">
      <div className="max-w-[1800px] mx-auto px-6 grid lg:grid-cols-12 gap-20">

        {/* 3D Canvas */}
        <div className="lg:col-span-7 h-[700px]">
          {wallet && (
            <WalletCanvas
              glbUrl={wallet.glb_url}
              options={options}
              selections={selections}
            />
          )}
        </div>

        {/* UI Panel */}
        <div className="lg:col-span-5 flex flex-col gap-8 justify-center">

          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">
              {wallet?.gender_category}
            </p>
            <h2 className="text-3xl text-white uppercase font-semibold tracking-wide">
              {wallet?.name}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-8">
            {options.map((opt) => {
              const isSelected = selections[opt.id] !== null;

              return (
                <div key={opt.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase tracking-widest text-white/80">
                      {opt.display_name}
                    </h3>
                    {!opt.is_required && (
                      <span
                        className={cx(
                          "text-[9px] uppercase tracking-widest px-2 py-0.5 border transition-colors",
                          isSelected
                            ? "border-white/30 text-white/50"
                            : "border-white/10 text-white/25"
                        )}
                      >
                        {isSelected ? "Added" : "Optional"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {opt.values.map((val) => (
                      <Swatch
                        key={val.id}
                        value={val}
                        selected={selections[opt.id]?.id === val.id}
                        onClick={() => selectValue(opt.id, val)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price + CTA */}
          <div className="border-t border-white/10 pt-6 flex items-center justify-between">
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">
                Total
              </p>
              <p className="text-2xl text-white font-semibold">
                {total.toLocaleString()}
                <span className="text-sm text-white/40 ml-1">MKD</span>
              </p>
            </div>

            <button
              onClick={handleOrder}
              disabled={ordering}
              className={cx(
                "px-8 py-3 text-xs uppercase tracking-widest font-medium transition-all duration-200",
                ordering
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-white text-black hover:bg-white/90 active:scale-95"
              )}
            >
              {ordering ? "Placing..." : "Order Now"}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Utility ───────────────────────────────────────────────
function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5;
}
