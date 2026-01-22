import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales: ["en", "mk"],
    defaultLocale: "en",
});

export const config = {
    matcher: ["/((?!_next|_vercel|api|favicon.ico|.*\\..*).*)"],
};
