# 随机数MCP服务器

一个Model Context Protocol (MCP) 服务器，提供对api.random.org服务的访问，用于生成真随机数、字符串、UUID等。

## 功能特性

此MCP服务器提供以下工具：

- **generateIntegers** - 在指定范围内生成真随机整数
- **generateIntegerSequences** - 生成真随机整数序列
- **generateDecimalFractions** - 生成0到1之间的随机小数
- **generateGaussians** - 生成高斯分布的随机数
- **generateStrings** - 从指定字符集生成随机字符串
- **generateUUIDs** - 生成真随机的UUID (版本4)
- **generateBlobs** - 生成base64或hex格式的随机二进制数据
- **getUsage** - 获取API使用统计信息

## 安装与部署

### 🚀 npm快速开始（推荐）

#### 方式1：全局安装
```bash
# 全局安装
npm install -g random-org-mcp-server

# 验证安装
random-org-mcp --version
```

#### 方式2：无需安装直接使用
```bash
# 使用npx直接运行（无需安装）
npx random-org-mcp-server
```

#### 方式3：项目本地安装
```bash
# 在项目中安装
npm install random-org-mcp-server

# 从node_modules运行
npx random-org-mcp-server
```

### 🛠️ 从源码构建
1. 克隆此仓库：
```bash
git clone https://github.com/QianJue-CN/TRUERandomMCP.git
cd TRUERandomMCP
```

2. 安装依赖：
```bash
npm install
```

3. 构建项目：
```bash
npm run build
```

## 配置

### 🔑 获取API密钥
1. 访问 [api.random.org](https://api.random.org/api-keys/beta) 获取免费API密钥
2. 注册并获取您的API密钥

### ⚙️ 配置方法

#### 方法1：环境变量（推荐）
在工作目录创建 `.env` 文件：
```bash
# 复制示例文件（如果从源码构建）
cp .env.example .env
```

编辑 `.env` 文件：
```env
RANDOM_ORG_API_KEY=your_api_key_here
RATE_LIMIT_REQUESTS_PER_SECOND=1
RATE_LIMIT_BURST_SIZE=5
REQUEST_TIMEOUT_MS=10000
MAX_RETRIES=3
RETRY_DELAY_MS=1000
```

#### 方法2：MCP客户端配置
直接在MCP客户端（如Claude Desktop）中配置：
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

### 环境变量

- `RANDOM_ORG_API_KEY` (必需) - 您的api.random.org API密钥
- `RATE_LIMIT_REQUESTS_PER_SECOND` (可选，默认：1) - 速率限制
- `RATE_LIMIT_BURST_SIZE` (可选，默认：5) - 速率限制的突发大小
- `REQUEST_TIMEOUT_MS` (可选，默认：10000) - 请求超时时间（毫秒）
- `MAX_RETRIES` (可选，默认：3) - 最大重试次数
- `RETRY_DELAY_MS` (可选，默认：1000) - 重试间隔时间

## 使用方法

## 🔗 MCP客户端集成

### Claude Desktop配置
1. 找到Claude Desktop配置文件：
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. 添加Random.org MCP服务器配置：
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

3. 重启Claude Desktop

### 其他配置方式

#### 使用全局安装
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

#### 使用本地安装
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

## 运行服务器

### 🚀 生产环境使用

#### 如果已全局安装：
```bash
random-org-mcp
```

#### 使用npx（无需安装）：
```bash
npx random-org-mcp-server
```

#### 从源码运行：
```bash
npm start
```

### 🛠️ 开发环境

开发模式（自动重载）：
```bash
npm run dev
```

### 工具示例

#### 生成随机整数
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

#### 生成随机字符串
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

#### 生成UUID
```json
{
  "name": "generateUUIDs",
  "arguments": {
    "n": 5
  }
}
```

#### 生成高斯分布随机数
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

#### 获取使用统计
```json
{
  "name": "getUsage",
  "arguments": {}
}
```

## API限制

api.random.org服务具有以下限制：

- **整数**: 每次请求1-10,000个数字
- **整数序列**: 1-10,000个序列，每个序列1-10,000个数字
- **小数**: 每次请求1-10,000个数字
- **高斯分布**: 每次请求1-10,000个数字
- **字符串**: 每次请求1-10,000个字符串，每个字符串1-20个字符
- **UUID**: 每次请求1-1,000个UUID
- **二进制数据**: 每次请求1-100个数据块，每个数据块1-1,048,576字节

## 错误处理

服务器包含全面的错误处理：

- 所有参数的输入验证
- 速率限制以遵守API限制
- 指数退避的自动重试
- 详细的错误消息用于故障排除

## 开发

### 脚本

- `npm run build` - 构建TypeScript代码
- `npm start` - 运行编译后的服务器
- `npm run dev` - 在开发模式下运行（自动重载）
- `npm run clean` - 清理构建目录

### 项目结构

```
src/
├── index.ts           # 主入口点
├── server.ts          # MCP服务器实现
├── randomOrgClient.ts # random.org的API客户端
├── rateLimiter.ts     # 速率限制实现
├── config.ts          # 配置管理
└── types.ts           # TypeScript类型定义
```

## 许可证

MIT许可证 - 详见LICENSE文件。

## 贡献

1. Fork仓库
2. 创建功能分支
3. 进行更改
4. 如适用，添加测试
5. 提交拉取请求

## 支持

对于与此MCP服务器相关的问题，请在[GitHub](https://github.com/QianJue-CN/TRUERandomMCP/issues)上开启issue。
对于api.random.org API问题，请参考其[文档](https://api.random.org/json-rpc/4)。
