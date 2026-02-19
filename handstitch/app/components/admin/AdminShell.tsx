"use client";

import Sidebar from "@/app/components/admin/Sidebar";
import Topbar from "@/app/components/admin/Topbar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-black">
            <div className="pointer-events-none fixed inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:90px_90px]" />
            <div className="relative mx-auto max-w-[1800px] px-4 md:px-8 py-6">
                <div className="grid grid-cols-12 gap-6">
                    <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
                        <Sidebar />
                    </aside>
                    <main className="col-span-12 lg:col-span-9 xl:col-span-10">
                        <Topbar />
                        <div className="mt-6">{children}</div>
                    </main>
                </div>
            </div>
        </div>
    );
}
