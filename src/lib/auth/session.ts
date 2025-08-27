import { auth } from '../auth';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { db } from '../db';
import { guest } from '../db/schema/index';
import { eq } from 'drizzle-orm';

export const getSession = cache(async () => {
  try {
    const session = await auth.api.getSession({
      headers: new Headers()
    });
    return session;
  } catch (error) {
    return null;
  }
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  return session?.user ?? null;
});

export const getGuestSessionFromCookie = cache(async () => {
  const cookieStore = await cookies();
  const guestSessionCookie = cookieStore.get('guest_session');
  
  if (!guestSessionCookie) {
    return null;
  }

  try {
    const guestRecord = await db
      .select()
      .from(guest)
      .where(eq(guest.sessionToken, guestSessionCookie.value))
      .limit(1);
    
    if (guestRecord.length === 0 || guestRecord[0].expiresAt <= new Date()) {
      return null;
    }

    return guestRecord[0];
  } catch (error) {
    return null;
  }
});

export const requireAuth = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
};

export const getSessionId = async () => {
  const user = await getCurrentUser();
  if (user) {
    return `user_${user.id}`;
  }
  
  const guestSession = await getGuestSessionFromCookie();
  if (guestSession) {
    return `guest_${guestSession.id}`;
  }
  
  return null;
};