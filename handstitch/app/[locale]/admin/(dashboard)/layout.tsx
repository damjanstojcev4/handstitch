import { redirect } from "next/navigation";
import { requireAdmin } from "@/app/api/admin/auth";
import AdminShell from "@/app/components/admin/AdminShell";

export default async function AdminLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const auth = await requireAdmin();

    if (!auth.ok) {
        redirect(`/${locale}/admin/login`);
    }

    return <AdminShell>{children} </AdminShell>;
}
