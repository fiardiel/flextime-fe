import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const userToken = request.cookies.get('userToken')
  const urlPath = new URL(request.url).pathname
  console.log('urlPath:', urlPath)
  const isAuthPage = urlPath.startsWith('/auth')

  if (userToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if (!userToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/register', request.url))
  }
  return NextResponse.next()
}
 
export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }