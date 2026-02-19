"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function AdminLoginPage() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "en";
    const t = useTranslations("admin.login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data?.message || t("error_failed"));
                return;
            }

            router.push(`/${locale}/admin`);
            router.refresh();
        } catch {
            setError(t("error_network"));
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="min-h-screen bg-white text-black flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-2xl border border-black/5 bg-black/[0.02] p-8">
                <p className="text-[10px] uppercase tracking-[0.34em] text-black/45">Handstitch</p>
                <h1 className="mt-2 text-xl font-semibold tracking-tight text-black/85">{t("title")}</h1>
                <p className="mt-2 text-sm text-black/55">{t("subtitle")}</p>

                {error && (
                    <div className="mt-5 rounded-xl border border-black/5 bg-black/5 px-4 py-3 text-sm text-black/75">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.28em] text-black/45">
                            {t("email")}
                        </label>
                        <input
                            className="mt-2 w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-black/85 outline-none focus:border-black/25"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.28em] text-black/45">
                            {t("password")}
                        </label>
                        <input
                            className="mt-2 w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-black/85 outline-none focus:border-black/25"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full rounded-xl border border-black/15 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-black/85 hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                    >
                        {loading ? t("submitting") : t("submit")}
                    </button>

                    <div className="pt-3 text-center text-[10px] uppercase tracking-[0.28em] text-black/30">
                        {t("footer")}
                    </div>
                </form>
            </div>
        </section>
    );
}
