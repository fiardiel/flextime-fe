import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkAdmin } from './apis/user_apis'
 
export async function middleware(request: NextRequest) {
  const referer = request.headers.get('referer')
  const userToken = request.cookies.get('userToken')?.value
  const urlPath = new URL(request.url).pathname
  const isAdmin = await checkAdmin(userToken)
  const isAdminPage = urlPath.startsWith('/admin')
  console.log('urlPath:', urlPath)
  const isAuthPage = urlPath.startsWith('/auth')

  if (userToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if (!userToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/register', request.url))
  } else if (!isAdmin && isAdminPage) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if (isAdmin && !isAdminPage) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  return NextResponse.next()
}
 
export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }