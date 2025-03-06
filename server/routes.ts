import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertHealthMetricSchema, 
  insertJournalEntrySchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', (req: any, res) => {
    res.json(req.session?.passport?.user || null);
  });
  // User routes
  app.post('/api/users', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: 'Invalid user data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Failed to create user' });
      }
    }
  });

  app.get('/api/users/:id', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  });

  // Health metrics routes
  app.post('/api/health-metrics', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const metricData = insertHealthMetricSchema.parse(req.body);
      const healthMetric = await storage.createHealthMetric(metricData);
      res.status(201).json(healthMetric);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: 'Invalid health metric data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Failed to create health metric' });
      }
    }
  });

  app.get('/api/health-metrics/:userId', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const metrics = await storage.getHealthMetricsByUserId(userId);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch health metrics' });
    }
  });

  // Journal entries routes
  app.post('/api/journal-entries', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const entryData = insertJournalEntrySchema.parse(req.body);
      const journalEntry = await storage.createJournalEntry(entryData);
      res.status(201).json(journalEntry);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: 'Invalid journal entry data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Failed to create journal entry' });
      }
    }
  });

  app.get('/api/journal-entries/:userId', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const entries = await storage.getJournalEntriesByUserId(userId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch journal entries' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
