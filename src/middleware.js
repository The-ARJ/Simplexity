import { NextResponse } from 'next/server';

function getUserFromCookie(request) {
    let user = null;
    try {
        const cookieValue = request.cookies.get('persist%3Auser')?.value;
        const userData = JSON.parse(decodeURIComponent(cookieValue));
        user = JSON.parse(userData.user);
    } catch (error) {
        console.error("Error parsing user cookie:", error);
    }
    return user;
}

function isRestrictedRoute(request, restrictedRoutes) {
    return restrictedRoutes.some(route => request.nextUrl.pathname.startsWith(route));
}

export function middleware(request) {
    const user = getUserFromCookie(request);

    const roleRoutes = {
        'admin': {
            'restrictedRoutes': ["/", "/shop"],
            'allowedRoutes': ["/dashboard", "/profile", "/users", "/profile/update-password", "/settings", "/e-commerce"],
            'redirectTo': '/dashboard'
        },
        'user': {
            'restrictedRoutes': ["/dashboard", "/e-commerce", "/users", "/settings", "/forgot-password"],
            'redirectTo': '/'
        },
        'guest': {
            'restrictedRoutes': ["/dashboard", "/e-commerce", "/users", "/settings", "/checkout", "/profile", "/verify-account"],
            'redirectTo': '/'
        }
    };

    const role = user ? user.role : 'guest';
    const isRestricted = isRestrictedRoute(request, roleRoutes[role].restrictedRoutes);
    const isAdminAllowed = role === 'admin' ? roleRoutes['admin'].allowedRoutes.includes(request.nextUrl.pathname) : true;

    if (isRestricted && (role !== 'admin' || !isAdminAllowed)) {
        return NextResponse.redirect(new URL(roleRoutes[role].redirectTo, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/shop", "/dashboard", "/profile/:path*", "/e-commerce", "/users", "/settings", "/forgot-password", "/checkout", "/verify-account"]
};
