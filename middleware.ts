import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/casino'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/account'],
}

