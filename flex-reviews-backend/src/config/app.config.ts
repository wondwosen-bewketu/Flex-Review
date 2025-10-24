/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables
config();

// Define environment variable schema
const envSchema = z.object({
  HOSTAWAY_ACCOUNT_ID: z.string(),
  HOSTAWAY_API_KEY: z.string(),
  GOOGLE_PLACES_API_KEY: z.string(),
  PORT: z.string().optional().default('3001'),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

export const appConfig = {
  hostaway: {
    accountId: env.HOSTAWAY_ACCOUNT_ID,
    apiKey: env.HOSTAWAY_API_KEY,
    baseUrl: 'https://api.hostaway.com/v1',
  },
  google: {
    apiKey: env.GOOGLE_PLACES_API_KEY,
    baseUrl: 'https://maps.googleapis.com/maps/api/place',
  },
  port: parseInt(env.PORT, 10),
};
