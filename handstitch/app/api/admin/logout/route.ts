import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set("xano_token", "", { path: "/", maxAge: 0 });
    return res;
}
