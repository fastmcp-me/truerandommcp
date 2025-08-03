import axios, { AxiosInstance, AxiosError } from 'axios';
import { RateLimiter } from './rateLimiter.js';
import {
  RandomOrgConfig,
  RandomOrgResponse,
  RandomOrgError,
  IntegerResult,
  IntegerSequenceResult,
  DecimalResult,
  GaussianResult,
  StringResult,
  UUIDResult,
  BlobResult,
  UsageResult,
  IntegerParams,
  IntegerSequenceParams,
  DecimalParams,
  GaussianParams,
  StringParams,
  UUIDParams,
  BlobParams,
} from './types.js';

export class RandomOrgClient {
  private client: AxiosInstance;
  private rateLimiter: RateLimiter;
  private requestId: number = 1;

  constructor(private config: RandomOrgConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.rateLimiter = new RateLimiter(
      config.rateLimitRequestsPerSecond || 1,
      config.rateLimitBurstSize || 5
    );
  }

  private async makeRequest<T>(method: string, params: any): Promise<T> {
    await this.rateLimiter.waitForToken();

    const requestData = {
      jsonrpc: '2.0',
      method,
      params: {
        apiKey: this.config.apiKey,
        ...params,
      },
      id: this.requestId++,
    };

    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= (this.config.maxRetries || 3); attempt++) {
      try {
        const response = await this.client.post('', requestData);

        if (response.data.error) {
          const error = response.data as RandomOrgError;
          throw new Error(`Random.org API Error: ${error.error.message} (Code: ${error.error.code})`);
        }

        const result = response.data as RandomOrgResponse<T>;
        return result.result;
      } catch (error) {
        lastError = error as Error;

        if (attempt < (this.config.maxRetries || 3)) {
          const delay = (this.config.retryDelay || 1000) * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(`Failed after ${this.config.maxRetries || 3} retries: ${lastError?.message || 'Unknown error'}`);
  }

  async generateIntegers(params: IntegerParams): Promise<IntegerResult> {
    this.validateIntegerParams(params);
    return this.makeRequest<IntegerResult>('generateIntegers', params);
  }

  async generateIntegerSequences(params: IntegerSequenceParams): Promise<IntegerSequenceResult> {
    this.validateIntegerSequenceParams(params);
    return this.makeRequest<IntegerSequenceResult>('generateIntegerSequences', params);
  }

  async generateDecimalFractions(params: DecimalParams): Promise<DecimalResult> {
    this.validateDecimalParams(params);
    return this.makeRequest<DecimalResult>('generateDecimalFractions', params);
  }

  async generateGaussians(params: GaussianParams): Promise<GaussianResult> {
    this.validateGaussianParams(params);
    return this.makeRequest<GaussianResult>('generateGaussians', params);
  }

  async generateStrings(params: StringParams): Promise<StringResult> {
    this.validateStringParams(params);
    return this.makeRequest<StringResult>('generateStrings', params);
  }

  async generateUUIDs(params: UUIDParams): Promise<UUIDResult> {
    this.validateUUIDParams(params);
    return this.makeRequest<UUIDResult>('generateUUIDs', params);
  }

  async generateBlobs(params: BlobParams): Promise<BlobResult> {
    this.validateBlobParams(params);
    return this.makeRequest<BlobResult>('generateBlobs', params);
  }

  async getUsage(): Promise<UsageResult> {
    return this.makeRequest<UsageResult>('getUsage', {});
  }

  // Validation methods
  private validateIntegerParams(params: IntegerParams): void {
    if (params.n < 1 || params.n > 10000) {
      throw new Error('n must be between 1 and 10,000');
    }
    if (params.min < -1000000000 || params.min > 1000000000) {
      throw new Error('min must be between -1,000,000,000 and 1,000,000,000');
    }
    if (params.max < -1000000000 || params.max > 1000000000) {
      throw new Error('max must be between -1,000,000,000 and 1,000,000,000');
    }
    if (params.min >= params.max) {
      throw new Error('min must be less than max');
    }
    if (params.base && ![2, 8, 10, 16].includes(params.base)) {
      throw new Error('base must be 2, 8, 10, or 16');
    }
  }

  private validateIntegerSequenceParams(params: IntegerSequenceParams): void {
    if (params.n < 1 || params.n > 10000) {
      throw new Error('n must be between 1 and 10,000');
    }
    if (params.length < 1 || params.length > 10000) {
      throw new Error('length must be between 1 and 10,000');
    }
    if (params.min < -1000000000 || params.min > 1000000000) {
      throw new Error('min must be between -1,000,000,000 and 1,000,000,000');
    }
    if (params.max < -1000000000 || params.max > 1000000000) {
      throw new Error('max must be between -1,000,000,000 and 1,000,000,000');
    }
    if (params.min >= params.max) {
      throw new Error('min must be less than max');
    }
  }

  private validateDecimalParams(params: DecimalParams): void {
    if (params.n < 1 || params.n > 10000) {
      throw new Error('n must be between 1 and 10,000');
    }
    if (params.decimalPlaces < 1 || params.decimalPlaces > 20) {
      throw new Error('decimalPlaces must be between 1 and 20');
    }
  }

  private validateGaussianParams(params: GaussianParams): void {
    if (params.n < 1 || params.n > 10000) {
      throw new Error('n must be between 1 and 10,000');
    }
    if (params.significantDigits < 2 || params.significantDigits > 20) {
      throw new Error('significantDigits must be between 2 and 20');
    }
  }

  private validateStringParams(params: StringParams): void {
    if (params.n < 1 || params.n > 10000) {
      throw new Error('n must be between 1 and 10,000');
    }
    if (params.length < 1 || params.length > 20) {
      throw new Error('length must be between 1 and 20');
    }
    if (!params.characters || params.characters.length === 0) {
      throw new Error('characters must be a non-empty string');
    }
  }

  private validateUUIDParams(params: UUIDParams): void {
    if (params.n < 1 || params.n > 1000) {
      throw new Error('n must be between 1 and 1,000');
    }
  }

  private validateBlobParams(params: BlobParams): void {
    if (params.n < 1 || params.n > 100) {
      throw new Error('n must be between 1 and 100');
    }
    if (params.size < 1 || params.size > 1048576) {
      throw new Error('size must be between 1 and 1,048,576 bytes');
    }
    if (params.format && !['base64', 'hex'].includes(params.format)) {
      throw new Error('format must be "base64" or "hex"');
    }
  }
}
