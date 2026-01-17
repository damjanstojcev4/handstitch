"use client";

import WalletCanvas from "./WalletCanvas";

export default function WalletConfigurator() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 h-[600px]">
      
      {/* LEFT — 3D CANVAS */}
      <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <WalletCanvas />
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
