// API Response Types
export interface RandomOrgResponse<T = any> {
  jsonrpc: string;
  result: T;
  id: number;
}

export interface RandomOrgError {
  jsonrpc: string;
  error: {
    code: number;
    message: string;
    data?: any;
  };
  id: number;
}

// Integer Generation
export interface IntegerResult {
  random: {
    data: number[];
    completionTime: string;
  };
  bitsUsed: number;
  bitsLeft: number;
  requestsLeft: number;
  advisoryDelay: number;
}

// Integer Sequences
export interface IntegerSequenceResult {
  random: {
    data: number[][];
    completionTime: string;
  };
  bitsUsed: number;
  bitsLeft: number;
  requestsLeft: number;
  advisoryDelay: number;
}

// Decimal Fractions
export interface DecimalResult {
  random: {
    data: number[];
    completionTime: string;
  };
  bitsUsed: number;
  bitsLeft: number;
  requestsLeft: number;
  advisoryDelay: number;
}

// Gaussians
export interface GaussianResult {
  random: {
    data: number[];
    completionTime: string;
  };
  bitsUsed: number;
  bitsLeft: number;
  requestsLeft: number;
  advisoryDelay: number;
}

// Strings
export interface StringResult {
  random: {
    data: string[];
    completionTime: string;
  };
  bitsUsed: number;
  bitsLeft: number;
  requestsLeft: number;
  advisoryDelay: number;
}

// UUIDs
export interface UUIDResult {
  random: {
    data: string[];
    completionTime: string;
  };
  bitsUsed: number;
  bitsLeft: number;
  requestsLeft: number;
  advisoryDelay: number;
}

// Blobs
export interface BlobResult {
  random: {
    data: string[];
    completionTime: string;
  };
  bitsUsed: number;
  bitsLeft: number;
  requestsLeft: number;
  advisoryDelay: number;
}

// Usage Information
export interface UsageResult {
  status: string;
  creationTime: string;
  bitsLeft: number;
  requestsLeft: number;
  totalBits: number;
  totalRequests: number;
}

// Request Parameters
export interface IntegerParams {
  n: number;
  min: number;
  max: number;
  replacement?: boolean;
  base?: number;
}

export interface IntegerSequenceParams {
  n: number;
  length: number;
  min: number;
  max: number;
  replacement?: boolean;
  base?: number;
}

export interface DecimalParams {
  n: number;
  decimalPlaces: number;
  replacement?: boolean;
}

export interface GaussianParams {
  n: number;
  mean: number;
  standardDeviation: number;
  significantDigits: number;
}

export interface StringParams {
  n: number;
  length: number;
  characters: string;
  replacement?: boolean;
}

export interface UUIDParams {
  n: number;
}

export interface BlobParams {
  n: number;
  size: number;
  format?: 'base64' | 'hex';
}

// Configuration
export interface RandomOrgConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
  rateLimitRequestsPerSecond?: number;
  rateLimitBurstSize?: number;
}
