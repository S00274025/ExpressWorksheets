import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required').default('mongodb://localhost:27017/expressworksheets'),
});

const result = envSchema.safeParse({
  ...process.env,
  PORT: process.env.PORT ?? '3000',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/expressworksheets',
});

const envData = result.success ? result.data : envSchema.parse({
  PORT: process.env.PORT ?? 3000,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/expressworksheets',
});

export const env = {
  port: envData.PORT,
  nodeEnv: envData.NODE_ENV,
  mongoURI: envData.MONGODB_URI,
};