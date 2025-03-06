import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Health metrics schema
export const healthMetrics = pgTable("health_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: timestamp("date").defaultNow().notNull(),
  recoveryScore: integer("recovery_score"), // 0-100
  strainScore: integer("strain_score"), // 0-21
  sleepScore: integer("sleep_score"), // 0-100
  hrv: integer("hrv"), // heart rate variability in ms
  restingHr: integer("resting_hr"), // resting heart rate in bpm
  respiratoryRate: integer("respiratory_rate"), // breaths per minute
  sleepDuration: integer("sleep_duration"), // in minutes
  deepSleep: integer("deep_sleep"), // in minutes
  remSleep: integer("rem_sleep"), // in minutes
  caloriesBurned: integer("calories_burned"),
  steps: integer("steps"),
});

// Journal entries schema
export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: timestamp("date").defaultNow().notNull(),
  behaviors: jsonb("behaviors").notNull(), // Store checked behaviors as a JSON object
  notes: text("notes"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
});

export const insertHealthMetricSchema = createInsertSchema(healthMetrics).pick({
  userId: true,
  date: true,
  recoveryScore: true,
  strainScore: true,
  sleepScore: true,
  hrv: true,
  restingHr: true,
  respiratoryRate: true,
  sleepDuration: true,
  deepSleep: true,
  remSleep: true,
  caloriesBurned: true,
  steps: true,
});

export const insertJournalEntrySchema = createInsertSchema(journalEntries).pick({
  userId: true,
  date: true,
  behaviors: true,
  notes: true,
});

// Type definitions for TypeScript
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type HealthMetric = typeof healthMetrics.$inferSelect;
export type InsertHealthMetric = z.infer<typeof insertHealthMetricSchema>;

export type JournalEntry = typeof journalEntries.$inferSelect;
export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
