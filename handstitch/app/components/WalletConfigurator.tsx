"use client";

import { useState } from "react";

import WalletCanvas from "./WalletCanvas";

export default function WalletConfigurator() {
  const [activeView, setActiveView] = useState("front");

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 h-[600px]">

      {/* LEFT — 3D CANVAS */}
      <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm relative">
        <WalletCanvas activeView={activeView} />

        {/* View Controls Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
          {['Front', 'Back', 'Detail', '360'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view.toLowerCase())}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeView === view.toLowerCase()
                ? 'bg-black text-white'
                : 'bg-transparent text-gray-700 hover:bg-black/5'
                }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT — OPTIONS PANEL */}
      <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">
          Customize your wallet
        </h2>

        <div className="border border-dashed border-gray-300 rounded-xl p-4 text-sm text-gray-500 text-center">
          Drag & drop options will appear here
        </div>

        <div className="border border-dashed border-gray-300 rounded-xl p-4 text-sm text-gray-500 text-center">
          Materials / Colors (coming soon)
        </div>

        <div className="border border-dashed border-gray-300 rounded-xl p-4 text-sm text-gray-500 text-center">
          Price summary
        </div>
      </div>

    </section>
  );
}
