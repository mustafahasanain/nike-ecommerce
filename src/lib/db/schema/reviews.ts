import { pgTable, uuid, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { products } from './products';
import { user } from './user';

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  user: one(user, {
    fields: [reviews.userId],
    references: [user.id],
  }),
}));

export const insertReviewSchema = createInsertSchema(reviews, {
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().max(2000, 'Comment must be at most 2000 characters').optional(),
});

export const selectReviewSchema = createSelectSchema(reviews);

export type Review = z.infer<typeof selectReviewSchema>;
export type NewReview = z.infer<typeof insertReviewSchema>;