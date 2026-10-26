import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const content=sqliteTable('content',{id:text('id').primaryKey(),data:text('data').notNull()});
export const quotes=sqliteTable('quotes',{id:text('id').primaryKey(),name:text('name').notNull(),email:text('email').notNull(),phone:text('phone').notNull(),location:text('location').notNull(),service:text('service').notNull(),budget:text('budget').notNull(),message:text('message').notNull(),status:text('status').notNull().default('New'),createdAt:integer('created_at').notNull()});
