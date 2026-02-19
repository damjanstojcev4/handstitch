import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const token = (await cookies()).get("xano_token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

    const base = process.env.XANO_BASE_URL!;
    const res = await fetch(`${base}/user`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request) {
    const token = (await cookies()).get("xano_token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

    const body = await req.json();
    const base = process.env.XANO_BASE_URL!;

    const res = await fetch(`${base}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
