import { NextResponse } from 'next/server'

export function middleware(request) {
    // Get the cookie value
    let cookieValue = request.cookies.get('persist%3Auser')?.value;

    let userData = null;
    let user = null;

    // Try to parse the cookie value to get the user object
    try {
        userData = JSON.parse(decodeURIComponent(cookieValue));
        user = JSON.parse(userData.user); // Parse the nested user string
    } catch (error) {
        console.error("Error parsing user cookie:", error);
    }

    const routesRestrictedForUser = ["/dashboard", "/e-commerce", "/users", "/settings", "/forgot-password"];
    const isAdminRoute = routesRestrictedForUser.some(route => request.nextUrl.pathname.startsWith(route));

    const routesRestrictedForAdmin = ["/", "/shop"];
    const isUserRoute = routesRestrictedForAdmin.some(route => request.nextUrl.pathname.startsWith(route));

    const routesRestrictedForGuestUsers = ["/dashboard", "/e-commerce", "/users", "/settings", "/checkout", "/profile", "/verify-account"];
    const isNotGuestRoute = routesRestrictedForGuestUsers.some(route => request.nextUrl.pathname.startsWith(route));

    const adminAllowedRoutes = ["/dashboard", "/profile", "/users", "/profile/update-password", "/settings", "e-commerce"];
    const isAdminAllowedRoute = adminAllowedRoutes.includes(request.nextUrl.pathname);

    if (user && user.role === "user" && isAdminRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    } else if (user && user.role === "admin" && isUserRoute && !isAdminAllowedRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (!user && isNotGuestRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    // If none of the conditions are met, allow the request to continue
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/shop", "/dashboard", "/profile/:path*", "/e-commerce", "/users", "/settings", "/forgot-password", "/checkout", "/verify-account"]
};
