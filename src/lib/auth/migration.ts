'use server';

import { db } from '../db';
import { guest } from '../db/schema/index';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

export async function migrateGuestData(userId: string) {
  const cookieStore = await cookies();
  const guestSessionCookie = cookieStore.get('guest_session');
  
  if (!guestSessionCookie) {
    return { success: true, message: 'No guest session to migrate' };
  }

  try {
    const guestSession = await db
      .select()
      .from(guest)
      .where(eq(guest.sessionToken, guestSessionCookie.value))
      .limit(1);

    if (guestSession.length === 0) {
      cookieStore.delete('guest_session');
      return { success: true, message: 'Guest session not found' };
    }

    const guestId = guestSession[0].id;

    await db.delete(guest).where(eq(guest.id, guestId));
    cookieStore.delete('guest_session');

    return { 
      success: true, 
      message: 'Guest data migrated successfully',
      migratedGuestId: guestId 
    };
  } catch (error) {
    console.error('Error migrating guest data:', error);
    return { 
      success: false, 
      message: 'Failed to migrate guest data',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function cleanupExpiredGuestSessions() {
  try {
    const result = await db
      .delete(guest)
      .where(eq(guest.expiresAt, new Date()));
    
    return { success: true, deletedCount: result.rowCount || 0 };
  } catch (error) {
    console.error('Error cleaning up expired guest sessions:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}