import { 
  User, 
  InsertUser, 
  HealthMetric, 
  InsertHealthMetric, 
  JournalEntry, 
  InsertJournalEntry 
} from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";

const MemorySessionStore = MemoryStore(session);

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
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }

  // Health metrics methods
  async createHealthMetric(insertMetric: InsertHealthMetric): Promise<HealthMetric> {
    const id = this.healthMetricCurrentId++;
    const healthMetric: HealthMetric = { ...insertMetric, id };
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
    const journalEntry: JournalEntry = { ...insertEntry, id };
    this.journalEntries.set(id, journalEntry);
    return journalEntry;
  }

  async getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values()).filter(
      (entry) => entry.userId === userId,
    );
  }
}

export const storage = new MemStorage();
