import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";

import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import MemoryStore from "memorystore";

if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

const MemorySessionStore = MemoryStore(session);

export async function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'your-secret-key-here',
    resave: false,
    saveUninitialized: false,
    store: new MemorySessionStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
  };
  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  const config = await client.discovery(
    new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
    process.env.REPL_ID!,
  );

  const hostname = `${process.env.REPLIT_DOMAINS!.split(",")[0]}`;
  const callbackURL = `https://${hostname}/api/callback`;
  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback) => {
    const claims = tokens.claims();
    if (!claims) {
      return;
    }

    const userInfoResponse = await client.fetchUserInfo(config, tokens.access_token, claims.sub);

    verified(null, userInfoResponse);
  };

  const strategy = new Strategy(
    {
      config,
      scope: "openid email profile",
      callbackURL,
    },
    verify,
  );
  passport.use(strategy);

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  app.get("/api/login", passport.authenticate(strategy.name));

  app.get(
    "/api/callback",
    passport.authenticate(strategy.name, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login",
    }),
  );

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}