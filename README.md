# Random.org MCP Server

A Model Context Protocol (MCP) server that provides access to the api.random.org service for generating true random numbers, strings, UUIDs, and more.

## Features

This MCP server provides the following tools:

- **generateIntegers** - Generate true random integers within a specified range
- **generateIntegerSequences** - Generate sequences of true random integers
- **generateDecimalFractions** - Generate random decimal fractions between 0 and 1
- **generateGaussians** - Generate random numbers from a Gaussian distribution
- **generateStrings** - Generate random strings from specified characters
- **generateUUIDs** - Generate true random UUIDs (version 4)
- **generateBlobs** - Generate random binary data in base64 or hex format
- **getUsage** - Get API usage statistics

## Installation

### Option 1: Install from npm (Recommended)
```bash
# Global installation
npm install -g random-org-mcp-server

# Or use without installation
npx random-org-mcp-server
```

### Option 2: Build from source
1. Clone this repository:
```bash
git clone https://github.com/QianJue-CN/TRUERandomMCP.git
cd TRUERandomMCP
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

1. Get an API key from [api.random.org](https://api.random.org/api-keys/beta)

2. Copy the environment file and configure it:
```bash
cp .env.example .env
```

3. Edit `.env` and add your API key:
```env
RANDOM_ORG_API_KEY=your_api_key_here
```

### Environment Variables

- `RANDOM_ORG_API_KEY` (required) - Your api.random.org API key
- `RATE_LIMIT_REQUESTS_PER_SECOND` (optional, default: 1) - Rate limiting
- `RATE_LIMIT_BURST_SIZE` (optional, default: 5) - Burst size for rate limiting
- `REQUEST_TIMEOUT_MS` (optional, default: 10000) - Request timeout in milliseconds
- `MAX_RETRIES` (optional, default: 3) - Maximum number of retries
- `RETRY_DELAY_MS` (optional, default: 1000) - Delay between retries

## Usage

### Running the Server

#### If installed globally:
```bash
random-org-mcp
```

#### Using npx (no installation required):
```bash
npx random-org-mcp-server
```

#### From source:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Tool Examples

#### Generate Random Integers
```json
{
  "name": "generateIntegers",
  "arguments": {
    "n": 5,
    "min": 1,
    "max": 100,
    "replacement": true,
    "base": 10
  }
}
```

#### Generate Random Strings
```json
{
  "name": "generateStrings",
  "arguments": {
    "n": 3,
    "length": 8,
    "characters": "abcdefghijklmnopqrstuvwxyz0123456789",
    "replacement": true
  }
}
```

#### Generate UUIDs
```json
{
  "name": "generateUUIDs",
  "arguments": {
    "n": 5
  }
}
```

#### Generate Gaussian Numbers
```json
{
  "name": "generateGaussians",
  "arguments": {
    "n": 10,
    "mean": 0,
    "standardDeviation": 1,
    "significantDigits": 6
  }
}
```

#### Get Usage Statistics
```json
{
  "name": "getUsage",
  "arguments": {}
}
```

## API Limits

The api.random.org service has the following limits:

- **Integers**: 1-10,000 numbers per request
- **Integer Sequences**: 1-10,000 sequences, each 1-10,000 numbers long
- **Decimal Fractions**: 1-10,000 numbers per request
- **Gaussians**: 1-10,000 numbers per request
- **Strings**: 1-10,000 strings per request, each 1-20 characters long
- **UUIDs**: 1-1,000 UUIDs per request
- **Blobs**: 1-100 blobs per request, each 1-1,048,576 bytes

## Error Handling

The server includes comprehensive error handling:

- Input validation for all parameters
- Rate limiting to respect API limits
- Automatic retries with exponential backoff
- Detailed error messages for troubleshooting

## Development

### Scripts

- `npm run build` - Build the TypeScript code
- `npm start` - Run the compiled server
- `npm run dev` - Run in development mode with auto-reload
- `npm run clean` - Clean the build directory

### Project Structure

```
src/
├── index.ts           # Main entry point
├── server.ts          # MCP server implementation
├── randomOrgClient.ts # API client for random.org
├── rateLimiter.ts     # Rate limiting implementation
├── config.ts          # Configuration management
└── types.ts           # TypeScript type definitions
```

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues related to this MCP server, please open an issue on [GitHub](https://github.com/QianJue-CN/TRUERandomMCP/issues).
For api.random.org API issues, please refer to their [documentation](https://api.random.org/json-rpc/4).
