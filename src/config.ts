import dotenv from 'dotenv';
import { RandomOrgConfig } from './types.js';

// Load environment variables
dotenv.config();

export const config: RandomOrgConfig = {
  apiKey: process.env.RANDOM_ORG_API_KEY || '',
  baseUrl: 'https://api.random.org/json-rpc/4/invoke',
  timeout: parseInt(process.env.REQUEST_TIMEOUT_MS || '10000'),
  maxRetries: parseInt(process.env.MAX_RETRIES || '3'),
  retryDelay: parseInt(process.env.RETRY_DELAY_MS || '1000'),
  rateLimitRequestsPerSecond: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_SECOND || '1'),
  rateLimitBurstSize: parseInt(process.env.RATE_LIMIT_BURST_SIZE || '5'),
};

export function validateConfig(): void {
  if (!config.apiKey) {
    throw new Error(
      'RANDOM_ORG_API_KEY environment variable is required. ' +
      'Get your API key from https://api.random.org/api-keys/beta'
    );
  }
}

export function getConfig(): RandomOrgConfig {
  validateConfig();
  return config;
}
