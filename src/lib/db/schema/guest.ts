import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const guest = pgTable('guest', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
});

export const insertGuestSchema = createInsertSchema(guest);
export const selectGuestSchema = createSelectSchema(guest);

export type Guest = z.infer<typeof selectGuestSchema>;
export type NewGuest = z.infer<typeof insertGuestSchema>;