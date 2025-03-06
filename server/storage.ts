import { 
  User, 
  InsertUser, 
  HealthMetric, 
  InsertHealthMetric, 
  JournalEntry, 
  InsertJournalEntry,
  users,
  healthMetrics,
  journalEntries
} from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { eq } from "drizzle-orm";
import { db, pool } from "./db";

const MemorySessionStore = MemoryStore(session);
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Health metrics methods
  createHealthMetric(metric: InsertHealthMetric): Promise<HealthMetric>;
  getHealthMetricsByUserId(userId: number): Promise<HealthMetric[]>;
  
  // Journal entries methods
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]>;
  
  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private healthMetrics: Map<number, HealthMetric>;
  private journalEntries: Map<number, JournalEntry>;
  
  private userCurrentId: number;
  private healthMetricCurrentId: number;
  private journalEntryCurrentId: number;
  
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.healthMetrics = new Map();
    this.journalEntries = new Map();
    
    this.userCurrentId = 1;
    this.healthMetricCurrentId = 1;
    this.journalEntryCurrentId = 1;
    
    // Initialize the memory session store
    this.sessionStore = new MemorySessionStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }

  // Health metrics methods
  async createHealthMetric(insertMetric: InsertHealthMetric): Promise<HealthMetric> {
    const id = this.healthMetricCurrentId++;
    const healthMetric: HealthMetric = { 
      ...insertMetric, 
      id,
      date: insertMetric.date || new Date(),
      recoveryScore: insertMetric.recoveryScore ?? null,
      strainScore: insertMetric.strainScore ?? null,
      sleepScore: insertMetric.sleepScore ?? null,
      hrv: insertMetric.hrv ?? null,
      restingHr: insertMetric.restingHr ?? null,
      respiratoryRate: insertMetric.respiratoryRate ?? null,
      sleepDuration: insertMetric.sleepDuration ?? null,
      deepSleep: insertMetric.deepSleep ?? null,
      remSleep: insertMetric.remSleep ?? null,
      caloriesBurned: insertMetric.caloriesBurned ?? null,
      steps: insertMetric.steps ?? null
    };
    this.healthMetrics.set(id, healthMetric);
    return healthMetric;
  }

  async getHealthMetricsByUserId(userId: number): Promise<HealthMetric[]> {
    return Array.from(this.healthMetrics.values()).filter(
      (metric) => metric.userId === userId,
    );
  }

  // Journal entries methods
  async createJournalEntry(insertEntry: InsertJournalEntry): Promise<JournalEntry> {
    const id = this.journalEntryCurrentId++;
    const journalEntry: JournalEntry = { 
      ...insertEntry, 
      id,
      date: insertEntry.date || new Date(),
      notes: insertEntry.notes ?? null
    };
    this.journalEntries.set(id, journalEntry);
    return journalEntry;
  }

  async getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values()).filter(
      (entry) => entry.userId === userId,
    );
  }
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    // Initialize PostgreSQL session store
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Health metrics methods
  async createHealthMetric(insertMetric: InsertHealthMetric): Promise<HealthMetric> {
    const [healthMetric] = await db
      .insert(healthMetrics)
      .values(insertMetric)
      .returning();
    return healthMetric;
  }

  async getHealthMetricsByUserId(userId: number): Promise<HealthMetric[]> {
    return await db
      .select()
      .from(healthMetrics)
      .where(eq(healthMetrics.userId, userId));
  }

  // Journal entries methods
  async createJournalEntry(insertEntry: InsertJournalEntry): Promise<JournalEntry> {
    const [journalEntry] = await db
      .insert(journalEntries)
      .values(insertEntry)
      .returning();
    return journalEntry;
  }

  async getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]> {
    return await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, userId));
  }
}

// Switch from MemStorage to DatabaseStorage
export const storage = new DatabaseStorage();
