import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('jwt')

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    //todo:: check if token valid or not

    return NextResponse.redirect(new URL('/dashboard', request.url))
}

export const config = {
    matcher: ['/'],
}