import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Protected routes that require authentication
         */
        '/dashboard/:path*',
        '/sell/:path*',
        '/settings/:path*',
        '/profile/:path*',
        '/api/checkout/:path*',
        '/api/stripe/:path*',
    ],
}
