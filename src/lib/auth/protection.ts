import { redirect } from 'next/navigation';
import { getCurrentUser } from './session';

export async function requireAuthForCheckout(redirectTo?: string) {
  const user = await getCurrentUser();
  
  if (!user) {
    const params = new URLSearchParams();
    if (redirectTo) {
      params.set('redirectTo', redirectTo);
    }
    redirect(`/sign-in?${params.toString()}`);
  }
  
  return user;
}

export async function redirectIfAuthenticated(redirectTo: string = '/') {
  const user = await getCurrentUser();
  
  if (user) {
    redirect(redirectTo);
  }
}

export function createProtectedRoute(redirectPath: string = '/sign-in') {
  return async function protectedRoute(redirectTo?: string) {
    const user = await getCurrentUser();
    
    if (!user) {
      const params = new URLSearchParams();
      if (redirectTo) {
        params.set('redirectTo', redirectTo);
      }
      redirect(`${redirectPath}?${params.toString()}`);
    }
    
    return user;
  };
}

export function createPublicOnlyRoute(redirectPath: string = '/') {
  return async function publicOnlyRoute() {
    const user = await getCurrentUser();
    
    if (user) {
      redirect(redirectPath);
    }
  };
}