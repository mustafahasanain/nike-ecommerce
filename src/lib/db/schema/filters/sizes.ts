import { pgTable, uuid, varchar, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const sizes = pgTable('sizes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 10 }).notNull().unique(),
  slug: varchar('slug', { length: 10 }).notNull().unique(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const insertSizeSchema = createInsertSchema(sizes, {
  name: z.string().min(1, 'Size name is required').max(10),
  slug: z.string().min(1, 'Size slug is required').max(10).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  sortOrder: z.number().int().min(0, 'Sort order must be non-negative'),
});

export const selectSizeSchema = createSelectSchema(sizes);

export type Size = z.infer<typeof selectSizeSchema>;
export type NewSize = z.infer<typeof insertSizeSchema>;