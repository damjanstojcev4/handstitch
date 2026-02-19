import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
    locales: ["en", "mk"],
    defaultLocale: "en",
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Detect /en/api/... or /mk/api/...
    const segments = pathname.split("/");
    const firstSegment = segments[1]; // /en/... -> firstSegment is "en"
    const secondSegment = segments[2]; // /en/api/... -> secondSegment is "api"

    if (["en", "mk"].includes(firstSegment) && secondSegment === "api") {
        // Redirect to /api/... (stripping the locale)
        const newPathname = "/" + segments.slice(2).join("/");
        const url = new URL(newPathname, request.url);
        return NextResponse.redirect(url, 301);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ["/((?!_next|_vercel|api|favicon.ico|.*\\..*).*)"],
};
