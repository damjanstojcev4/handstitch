"use client";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Topbar() {
    const t = useTranslations("admin.common");
    const pathname = usePathname();
    const leaf = pathname.split("/").slice(-1)[0] || "admin";

    return (
        <div className="rounded-2xl border border-black/5 bg-black/[0.02] px-5 py-4 flex items-center justify-between">
            <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-black/45">{t("console")}</p>
                <h1 className="mt-1 text-sm uppercase tracking-[0.18em] text-black/85">
                    {leaf === "admin" ? t("dashboard") : leaf}
                </h1>
            </div>
        </div>
    );
}
