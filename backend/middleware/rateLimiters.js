import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  keyGenerator: ipKeyGenerator,
  message: "Requête refusée"
});

export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  keyGenerator: ipKeyGenerator,
  message: "Trop de requêtes"
});
