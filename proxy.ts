import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const publicRoutes = createRouteMatcher([
  '/sso-callback(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',            // home, etc.
  // add any other public routes
])

export default clerkMiddleware(async (_auth, req) => {
  if (publicRoutes(req)) {
    return  // allow public access
  }
  // Otherwise, protect or do nothing (depending on your needs)
  // e.g. await auth().protect()  or just let middleware run
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|…extensions…)).*)',
    '/(api|trpc)(.*)',
  ],
}
