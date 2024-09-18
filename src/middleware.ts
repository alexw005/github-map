import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const oauthCookie = request.cookies.get('_oauth2_proxy')

    console.log('Current path', request.url)


    if (!oauthCookie && request.nextUrl.pathname !== '/login') {
        return Response.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/', '/login']
}