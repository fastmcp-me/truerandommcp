import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { RandomOrgClient } from './randomOrgClient.js';
import { getConfig } from './config.js';

export class RandomOrgMCPServer {
  private server: Server;
  private randomOrgClient: RandomOrgClient;

  constructor() {
    this.server = new Server(
      {
        name: 'random-org-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    const config = getConfig();
    this.randomOrgClient = new RandomOrgClient(config);
    this.setupToolHandlers();
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'generateIntegers',
            description: 'Generate true random integers within a specified range',
            inputSchema: {
              type: 'object',
              properties: {
                n: {
                  type: 'number',
                  description: 'Number of integers to generate (1-10,000)',
                  minimum: 1,
                  maximum: 10000,
                },
                min: {
                  type: 'number',
                  description: 'Minimum value (inclusive)',
                  minimum: -1000000000,
                  maximum: 1000000000,
                },
                max: {
                  type: 'number',
                  description: 'Maximum value (inclusive)',
                  minimum: -1000000000,
                  maximum: 1000000000,
                },
                replacement: {
                  type: 'boolean',
                  description: 'Allow replacement (duplicates)',
                  default: true,
                },
                base: {
                  type: 'number',
                  description: 'Number base (2, 8, 10, or 16)',
                  enum: [2, 8, 10, 16],
                  default: 10,
                },
              },
              required: ['n', 'min', 'max'],
            },
          },
          {
            name: 'generateIntegerSequences',
            description: 'Generate sequences of true random integers',
            inputSchema: {
              type: 'object',
              properties: {
                n: {
                  type: 'number',
                  description: 'Number of sequences to generate (1-10,000)',
                  minimum: 1,
                  maximum: 10000,
                },
                length: {
                  type: 'number',
                  description: 'Length of each sequence (1-10,000)',
                  minimum: 1,
                  maximum: 10000,
                },
                min: {
                  type: 'number',
                  description: 'Minimum value (inclusive)',
                  minimum: -1000000000,
                  maximum: 1000000000,
                },
                max: {
                  type: 'number',
                  description: 'Maximum value (inclusive)',
                  minimum: -1000000000,
                  maximum: 1000000000,
                },
                replacement: {
                  type: 'boolean',
                  description: 'Allow replacement within each sequence',
                  default: true,
                },
                base: {
                  type: 'number',
                  description: 'Number base (2, 8, 10, or 16)',
                  enum: [2, 8, 10, 16],
                  default: 10,
                },
              },
              required: ['n', 'length', 'min', 'max'],
            },
          },
          {
            name: 'generateDecimalFractions',
            description: 'Generate true random decimal fractions between 0 and 1',
            inputSchema: {
              type: 'object',
              properties: {
                n: {
                  type: 'number',
                  description: 'Number of decimal fractions to generate (1-10,000)',
                  minimum: 1,
                  maximum: 10000,
                },
                decimalPlaces: {
                  type: 'number',
                  description: 'Number of decimal places (1-20)',
                  minimum: 1,
                  maximum: 20,
                },
                replacement: {
                  type: 'boolean',
                  description: 'Allow replacement (duplicates)',
                  default: true,
                },
              },
              required: ['n', 'decimalPlaces'],
            },
          },
          {
            name: 'generateGaussians',
            description: 'Generate true random numbers from a Gaussian distribution',
            inputSchema: {
              type: 'object',
              properties: {
                n: {
                  type: 'number',
                  description: 'Number of Gaussian numbers to generate (1-10,000)',
                  minimum: 1,
                  maximum: 10000,
                },
                mean: {
                  type: 'number',
                  description: 'Mean of the distribution',
                },
                standardDeviation: {
                  type: 'number',
                  description: 'Standard deviation of the distribution',
                  minimum: 0,
                },
                significantDigits: {
                  type: 'number',
                  description: 'Number of significant digits (2-20)',
                  minimum: 2,
                  maximum: 20,
                },
              },
              required: ['n', 'mean', 'standardDeviation', 'significantDigits'],
            },
          },
          {
            name: 'generateStrings',
            description: 'Generate true random strings',
            inputSchema: {
              type: 'object',
              properties: {
                n: {
                  type: 'number',
                  description: 'Number of strings to generate (1-10,000)',
                  minimum: 1,
                  maximum: 10000,
                },
                length: {
                  type: 'number',
                  description: 'Length of each string (1-20)',
                  minimum: 1,
                  maximum: 20,
                },
                characters: {
                  type: 'string',
                  description: 'Characters to use for generation',
                },
                replacement: {
                  type: 'boolean',
                  description: 'Allow replacement within each string',
                  default: true,
                },
              },
              required: ['n', 'length', 'characters'],
            },
          },
          {
            name: 'generateUUIDs',
            description: 'Generate true random UUIDs (version 4)',
            inputSchema: {
              type: 'object',
              properties: {
                n: {
                  type: 'number',
                  description: 'Number of UUIDs to generate (1-1,000)',
                  minimum: 1,
                  maximum: 1000,
                },
              },
              required: ['n'],
            },
          },
          {
            name: 'generateBlobs',
            description: 'Generate true random binary data',
            inputSchema: {
              type: 'object',
              properties: {
                n: {
                  type: 'number',
                  description: 'Number of blobs to generate (1-100)',
                  minimum: 1,
                  maximum: 100,
                },
                size: {
                  type: 'number',
                  description: 'Size of each blob in bytes (1-1,048,576)',
                  minimum: 1,
                  maximum: 1048576,
                },
                format: {
                  type: 'string',
                  description: 'Output format',
                  enum: ['base64', 'hex'],
                  default: 'base64',
                },
              },
              required: ['n', 'size'],
            },
          },
          {
            name: 'getUsage',
            description: 'Get API usage statistics',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'generateIntegers':
            return await this.handleGenerateIntegers(args);
          case 'generateIntegerSequences':
            return await this.handleGenerateIntegerSequences(args);
          case 'generateDecimalFractions':
            return await this.handleGenerateDecimalFractions(args);
          case 'generateGaussians':
            return await this.handleGenerateGaussians(args);
          case 'generateStrings':
            return await this.handleGenerateStrings(args);
          case 'generateUUIDs':
            return await this.handleGenerateUUIDs(args);
          case 'generateBlobs':
            return await this.handleGenerateBlobs(args);
          case 'getUsage':
            return await this.handleGetUsage(args);
          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${errorMessage}`);
      }
    });
  }

  private async handleGenerateIntegers(args: any) {
    const result = await this.randomOrgClient.generateIntegers(args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            data: result.random.data,
            completionTime: result.random.completionTime,
            bitsUsed: result.bitsUsed,
            bitsLeft: result.bitsLeft,
            requestsLeft: result.requestsLeft,
            advisoryDelay: result.advisoryDelay,
          }, null, 2),
        },
      ],
    };
  }

  private async handleGenerateIntegerSequences(args: any) {
    const result = await this.randomOrgClient.generateIntegerSequences(args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            data: result.random.data,
            completionTime: result.random.completionTime,
            bitsUsed: result.bitsUsed,
            bitsLeft: result.bitsLeft,
            requestsLeft: result.requestsLeft,
            advisoryDelay: result.advisoryDelay,
          }, null, 2),
        },
      ],
    };
  }

  private async handleGenerateDecimalFractions(args: any) {
    const result = await this.randomOrgClient.generateDecimalFractions(args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            data: result.random.data,
            completionTime: result.random.completionTime,
            bitsUsed: result.bitsUsed,
            bitsLeft: result.bitsLeft,
            requestsLeft: result.requestsLeft,
            advisoryDelay: result.advisoryDelay,
          }, null, 2),
        },
      ],
    };
  }

  private async handleGenerateGaussians(args: any) {
    const result = await this.randomOrgClient.generateGaussians(args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            data: result.random.data,
            completionTime: result.random.completionTime,
            bitsUsed: result.bitsUsed,
            bitsLeft: result.bitsLeft,
            requestsLeft: result.requestsLeft,
            advisoryDelay: result.advisoryDelay,
          }, null, 2),
        },
      ],
    };
  }

  private async handleGenerateStrings(args: any) {
    const result = await this.randomOrgClient.generateStrings(args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            data: result.random.data,
            completionTime: result.random.completionTime,
            bitsUsed: result.bitsUsed,
            bitsLeft: result.bitsLeft,
            requestsLeft: result.requestsLeft,
            advisoryDelay: result.advisoryDelay,
          }, null, 2),
        },
      ],
    };
  }

  private async handleGenerateUUIDs(args: any) {
    const result = await this.randomOrgClient.generateUUIDs(args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            data: result.random.data,
            completionTime: result.random.completionTime,
            bitsUsed: result.bitsUsed,
            bitsLeft: result.bitsLeft,
            requestsLeft: result.requestsLeft,
            advisoryDelay: result.advisoryDelay,
          }, null, 2),
        },
      ],
    };
  }

  private async handleGenerateBlobs(args: any) {
    const result = await this.randomOrgClient.generateBlobs(args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            data: result.random.data,
            completionTime: result.random.completionTime,
            bitsUsed: result.bitsUsed,
            bitsLeft: result.bitsLeft,
            requestsLeft: result.requestsLeft,
            advisoryDelay: result.advisoryDelay,
          }, null, 2),
        },
      ],
    };
  }

  private async handleGetUsage(args: any) {
    const result = await this.randomOrgClient.getUsage();
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Random.org MCP server running on stdio');
  }
}
