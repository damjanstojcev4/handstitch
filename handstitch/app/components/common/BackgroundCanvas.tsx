"use client";

export const BackgroundCanvas = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-zinc-800">
            {/* 
                MAIN BACKGROUND COLOR 
                You can change the 'bg-zinc-800' class above to adjust the overall page background.
                Example: 'bg-zinc-900', 'bg-gray-800', etc.
            */}

            {/* 1. THE DRAFTSMAN GRID (Single Global Canvas) */}
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(theme('colors.stone.400') 1px, transparent 1px), linear-gradient(90deg, theme('colors.stone.400') 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* 2. SUBTLE NOISE/GRAIN LAYER */}
            <div
                className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* 3. VIGNETTE OVERLAY */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,theme('colors.black/40')_100%)]" />

            {/* 4. CONTENT ACCENT GRADIENT (Stationary) */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-stone-400/5 blur-[120px] rounded-full -translate-y-1/2" />
        </div>
    );
};

export default BackgroundCanvas;
