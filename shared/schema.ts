import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const teams = pgTable("teams", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  totalSpent: decimal("total_spent", { precision: 10, scale: 2 }).notNull().default("0"),
  playersCount: integer("players_count").notNull().default(0),
  overseasCount: integer("overseas_count").notNull().default(0),
  fundsRemaining: decimal("funds_remaining", { precision: 10, scale: 2 }).notNull().default("0"),
  totalPoints: integer("total_points").notNull().default(0),
  startingBudget: decimal("starting_budget", { precision: 10, scale: 2 }).notNull().default("0"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const players = pgTable("players", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  teamId: varchar("team_id").references(() => teams.id),
  role: text("role").notNull(),
  nation: text("nation").notNull(),
  age: integer("age"),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull().default("0"),
  soldPrice: decimal("sold_price", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("unsold"),
  overseas: boolean("overseas").notNull().default(false),
  points: integer("points").notNull().default(0),
  originalIndex: integer("original_index"),
  images: text("images"),
  t20Matches: integer("t20_matches"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTeamSchema = createInsertSchema(teams);
export const insertPlayerSchema = createInsertSchema(players);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Team = typeof teams.$inferSelect;
export type Player = typeof players.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
