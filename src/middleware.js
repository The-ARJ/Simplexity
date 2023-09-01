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
        console.log('user data after parse', user.role);
    } catch (error) {
        console.error("Error parsing user cookie:", error);
    }

    // Routes meant for logged-in users
    const routesToCheckforUsers = ["/dashboard", "/e-commerce", "/users", "/settings", "/forgot-password"];
    const isAdminRoute = routesToCheckforUsers.some(route => request.nextUrl.pathname.startsWith(route));

    // Routes meant for guests or general users
    const routesToCheckforAdmin = ["/", "/shop"];
    const isUserRoute = routesToCheckforAdmin.some(route => request.nextUrl.pathname.startsWith(route));

    // Routes meant for logged-in users
    const routesToCheckforGuestUsers = ["/dashboard", "/e-commerce", "/users", "/settings", "/checkout", "/profile"];
    const isNotGuestRoute = routesToCheckforGuestUsers.some(route => request.nextUrl.pathname.startsWith(route));

    if (user && user.role === "user" && isAdminRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    } else if (user && user.role === "admin" && isUserRoute && request.nextUrl.pathname !== "/dashboard") {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (!user && isNotGuestRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    // If none of the conditions are met, allow the request to continue
    return NextResponse.next();

}
export const config = {
    matcher: ["/", "/shop", "/dashboard", "/profile/:path*", "/e-commerce", "/users", "/settings", "/forgot-password", "/checkout"]
};