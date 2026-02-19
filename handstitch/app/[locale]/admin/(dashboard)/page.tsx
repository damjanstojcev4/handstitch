"use client";
import { useTranslations } from "next-intl";

export default function AdminDashboard() {
    const t = useTranslations("admin.dashboard");

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 rounded-2xl border border-black/5 bg-black/[0.02] p-8">
                <p className="text-[10px] uppercase tracking-[0.34em] text-black/45">{t("overview")}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black/85">{t("title")}</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-black/30">{t("status_system")}</p>
                        <p className="mt-1 text-sm text-green-600">{t("status_connected")}</p>
                    </div>
                    <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-black/30">{t("status_auth")}</p>
                        <p className="mt-1 text-sm text-black/70">{t("status_verified")}</p>
                    </div>
                </div>
                <p className="mt-8 text-sm text-black/45 italic">
                    {t("ready_notice")}
                </p>
            </div>
        </div>
    );
}
