import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const colors = pgTable('colors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  hexCode: varchar('hex_code', { length: 7 }).notNull(),
});

export const insertColorSchema = createInsertSchema(colors, {
  name: z.string().min(1, 'Color name is required').max(50),
  slug: z.string().min(1, 'Color slug is required').max(50).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  hexCode: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Hex code must be in format #RRGGBB'),
});

export const selectColorSchema = createSelectSchema(colors);

export type Color = z.infer<typeof selectColorSchema>;
export type NewColor = z.infer<typeof insertColorSchema>;