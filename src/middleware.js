export function middleware(req){

    const path=req.nextUrl.pathname
    let isPublicPath=false
    if(path=='/sign-in'||path=='/sign-up'||path=='/hod-login'){
        isPublicPath=true
    }
    const token = req.cookies.get('token')?.value || '';

    if(isPublicPath && token){
        return Response.redirect(new URL('/',req.nextUrl))
    }
    if(!isPublicPath && !token){
        return Response.redirect(new URL('/sign-in',req.nextUrl))
    }

}
export const config = {
    matcher: [
      '/dashboard(.*)',
      '/sign-in',
      '/sign-up',
      '/hod-login'
    ],
  };