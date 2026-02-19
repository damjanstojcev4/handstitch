import { cookies } from "next/headers";

export type Me = {
    id: number;
    email: string;
    role?: string;
    name?: string;
};

export async function getToken(): Promise<string | null> {
    const jar = await cookies();
    return jar.get("xano_token")?.value ?? null;
}

export async function getMe(): Promise<Me | null> {
    const token = await getToken();
    if (!token) return null;

    const base = process.env.XANO_BASE_URL!;
    const res = await fetch(`${base}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
}

export async function requireAdmin() {
    const me = await getMe();
    if (!me) return { ok: false as const, reason: "unauthenticated" as const };
    if (me.role !== "admin") return { ok: false as const, reason: "forbidden" as const };
    return { ok: true as const, me };
}
