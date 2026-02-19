import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const base = process.env.XANO_BASE_URL!;
    const res = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json(
            { message: data?.message || "Invalid email or password" },
            { status: res.status }
        );
    }

    const response = NextResponse.json({ ok: true }, { status: 200 });

    // HttpOnly cookie: browser stores it; JS cannot read it
    response.cookies.set("xano_token", data.authToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
}
