"use client";

import { useEffect, useMemo, useState } from "react";

type UserRow = {
    id: number;
    email: string;
    name?: string;
    role?: string; // "admin" | "editor"
    created_at?: number;
};

export default function UsersPage() {
    const [rows, setRows] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    // create form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"admin" | "editor">("editor");
    const [creating, setCreating] = useState(false);

    async function load() {
        setLoading(true);
        setErr(null);
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Failed to load users");
            setRows(Array.isArray(data) ? data : data?.items ?? data?.data ?? []);
        } catch (e: any) {
            setErr(e.message || "Error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function createUser(e: React.FormEvent) {
        e.preventDefault();
        setCreating(true);
        setErr(null);
        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Failed to create user");

            setEmail("");
            setPassword("");
            setRole("editor");
            await load();
        } catch (e: any) {
            setErr(e.message || "Error");
        } finally {
            setCreating(false);
        }
    }

    const count = useMemo(() => rows.length, [rows]);

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.34em] text-black/45">Access control</p>
                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-black/85">Users</h2>
                    <p className="mt-2 text-sm text-black/55">Create admin accounts and staff logins.</p>
                </div>

                <div className="rounded-xl border border-black/5 bg-black/[0.02] px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Total</p>
                    <p className="mt-1 text-sm text-black/80">{count}</p>
                </div>
            </div>

            {err && (
                <div className="rounded-2xl border border-black/5 bg-black/5 px-5 py-4 text-sm text-black/75">
                    {err}
                </div>
            )}

            {/* Create */}
            <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-6">
                <p className="text-[10px] uppercase tracking-[0.32em] text-black/45">Create user</p>

                <form onSubmit={createUser} className="mt-5 grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-5">
                        <label className="block text-[10px] uppercase tracking-[0.28em] text-black/45">Email</label>
                        <input
                            className="mt-2 w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-black/85 outline-none focus:border-black/25"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                    </div>

                    <div className="col-span-12 md:col-span-4">
                        <label className="block text-[10px] uppercase tracking-[0.28em] text-black/45">Password</label>
                        <input
                            className="mt-2 w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-black/85 outline-none focus:border-black/25"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />
                    </div>

                    <div className="col-span-12 md:col-span-2">
                        <label className="block text-[10px] uppercase tracking-[0.28em] text-black/45">Role</label>
                        <select
                            className="mt-2 w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-black/85 outline-none focus:border-black/25"
                            value={role}
                            onChange={(e) => setRole(e.target.value as any)}
                        >
                            <option value="editor">editor</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>

                    <div className="col-span-12 md:col-span-1 flex items-end">
                        <button
                            disabled={creating}
                            className="w-full rounded-xl border border-black/15 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-black/85 hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                        >
                            {creating ? "…" : "Add"}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-xs text-black/45">
                    Tip: keep only your account as <span className="text-black/70">admin</span>, everyone else as <span className="text-black/70">editor</span>.
                </p>
            </div>

            {/* List */}
            <div className="rounded-2xl border border-black/5 bg-black/[0.02] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-black/5">
                            <tr>
                                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.32em] text-black/45">ID</th>
                                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.32em] text-black/45">Email</th>
                                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.32em] text-black/45">Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="px-5 py-10 text-sm text-black/55">Loading…</td>
                                </tr>
                            ) : rows.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-5 py-10 text-sm text-black/55">No users found.</td>
                                </tr>
                            ) : (
                                rows.map((u) => (
                                    <tr key={u.id} className="border-t border-black/5 hover:bg-black/[0.01] transition-colors">
                                        <td className="px-5 py-4 text-sm text-black/70">{u.id}</td>
                                        <td className="px-5 py-4 text-sm text-black/85">{u.email}</td>
                                        <td className="px-5 py-4 text-sm text-black/70">
                                            <span className="inline-flex rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em]">
                                                {u.role ?? "unknown"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <button
                onClick={load}
                className="rounded-xl border border-black/15 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-black/80 hover:bg-black hover:text-white transition-colors"
            >
                Refresh
            </button>
        </div>
    );
}
