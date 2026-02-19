"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    // later: models, materials, orders, gallery...
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const locale = pathname.split("/")[1] || "en";

    async function signOut() {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push(`/${locale}/admin/login`);
        router.refresh();
    }

    return (
        <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.34em] text-black/45">Handstitch</p>
                    <h2 className="mt-1 text-sm uppercase tracking-[0.18em] text-black/85">Admin</h2>
                </div>
            </div>

            <div className="mt-6 space-y-1">
                {nav.map((item) => {
                    const href = `/${locale}${item.href}`;
                    const active = pathname === href;

                    return (
                        <Link
                            key={item.href}
                            href={href}
                            className={[
                                "flex items-center justify-between rounded-xl px-3 py-2 transition-colors",
                                active ? "bg-black text-white" : "text-black/75 hover:bg-black/5 hover:text-black",
                            ].join(" ")}
                        >
                            <span className="uppercase tracking-[0.14em] text-[11px] font-medium">
                                {item.label}
                            </span>
                            <span className={active ? "text-white/50" : "text-black/25"}>→</span>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-6 pt-5 border-t border-black/5">
                <button
                    onClick={signOut}
                    className="w-full rounded-xl border border-black/15 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-black/80 hover:bg-black hover:text-white transition-colors"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
}
