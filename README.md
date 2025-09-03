[![Add to Cursor](https://fastmcp.me/badges/cursor_dark.svg)](https://fastmcp.me/MCP/Details/806/randomorg)
[![Add to VS Code](https://fastmcp.me/badges/vscode_dark.svg)](https://fastmcp.me/MCP/Details/806/randomorg)
[![Add to Claude](https://fastmcp.me/badges/claude_dark.svg)](https://fastmcp.me/MCP/Details/806/randomorg)
[![Add to ChatGPT](https://fastmcp.me/badges/chatgpt_dark.svg)](https://fastmcp.me/MCP/Details/806/randomorg)

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

## Installation & Deployment

### 🚀 Quick Start with npm (Recommended)

#### Method 1: Global Installation
```bash
# Install globally
npm install -g random-org-mcp-server

# Verify installation
random-org-mcp --version
```

#### Method 2: Use without Installation
```bash
# Run directly with npx (no installation required)
npx random-org-mcp-server
```

#### Method 3: Local Project Installation
```bash
# Install in your project
npm install random-org-mcp-server

# Run from node_modules
npx random-org-mcp-server
```

### 🛠️ Build from Source
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

### 🔑 Get API Key
1. Visit [api.random.org](https://api.random.org/api-keys/beta) to get a free API key
2. Register and obtain your API key

### ⚙️ Configuration Methods

#### Method 1: Environment Variables (Recommended)
Create a `.env` file in your working directory:
```bash
# Copy example file (if building from source)
cp .env.example .env
```

Edit `.env` file:
```env
RANDOM_ORG_API_KEY=your_api_key_here
RATE_LIMIT_REQUESTS_PER_SECOND=1
RATE_LIMIT_BURST_SIZE=5
REQUEST_TIMEOUT_MS=10000
MAX_RETRIES=3
RETRY_DELAY_MS=1000
```

#### Method 2: MCP Client Configuration
Configure directly in your MCP client (e.g., Claude Desktop):
```json
{
  "mcpServers": {
    "random-org": {
      "command": "npx",
      "args": ["random-org-mcp-server"],
      "env": {
        "RANDOM_ORG_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Environment Variables

- `RANDOM_ORG_API_KEY` (required) - Your api.random.org API key
- `RATE_LIMIT_REQUESTS_PER_SECOND` (optional, default: 1) - Rate limiting
- `RATE_LIMIT_BURST_SIZE` (optional, default: 5) - Burst size for rate limiting
- `REQUEST_TIMEOUT_MS` (optional, default: 10000) - Request timeout in milliseconds
- `MAX_RETRIES` (optional, default: 3) - Maximum number of retries
- `RETRY_DELAY_MS` (optional, default: 1000) - Delay between retries

## Usage

## 🔗 MCP Client Integration

### Claude Desktop Configuration
1. Locate your Claude Desktop configuration file:
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Add the Random.org MCP server configuration:
```json
{
  "mcpServers": {
    "random-org": {
      "command": "npx",
      "args": ["random-org-mcp-server"],
      "env": {
        "RANDOM_ORG_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

3. Restart Claude Desktop

### Alternative Configurations

#### Using Global Installation
```json
{
  "mcpServers": {
    "random-org": {
      "command": "random-org-mcp",
      "env": {
        "RANDOM_ORG_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

#### Using Local Installation
```json
{
  "mcpServers": {
    "random-org": {
      "command": "node",
      "args": ["node_modules/random-org-mcp-server/dist/index.js"],
      "env": {
        "RANDOM_ORG_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Running the Server

### 🚀 Production Usage

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

### 🛠️ Development

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
