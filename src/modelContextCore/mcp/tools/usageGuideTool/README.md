# Usage Guide Tool

## Overview

The Usage Guide Tool is a specialized MCP tool designed to help users navigate and effectively utilize GRIX's suite of trading tools. It serves as an intelligent assistant that provides contextual guidance, recommendations, and best practices for using GRIX's trading tools.

## Features

### 1. Goal-Based Recommendations

- Analyzes user's trading goals and requirements
- Suggests relevant tools based on natural language input
- Provides contextual recommendations based on use cases

### 2. Category-Based Navigation

- Organizes tools into logical categories:
  - Trading Indicators
  - Signals
  - Perpetual Futures
  - Options
  - Asset Price Predictions
  - Altcoins Derivatives

### 3. Detailed Tool Documentation

For each tool, provides:

- Comprehensive description
- Common use cases
- Required parameters and their explanations
- Usage examples
- Best practices
- Related tools

### 4. Workflow Suggestions

- Predefined workflows combining multiple tools
- Step-by-step guides for common trading scenarios
- Integration patterns between different tools

## Usage

### Basic Usage

```typescript
await usageGuideTool.handler({
  goal: 'I want to analyze BTC market trends',
});
```

### Category-Specific Guidance

```typescript
await usageGuideTool.handler({
  goal: 'Show me trading tools',
  category: 'trading-indicators',
});
```

### Tool-Specific Documentation

```typescript
await usageGuideTool.handler({
  goal: 'Learn about indicators',
  specificTool: 'getTradingIndicators',
});
```

## Tool Categories and Capabilities

### Trading Indicators

- Real-time market indicators from major exchanges
- Multi-timeframe analysis
- Technical indicators (RSI, EMA, MACD, etc.)
- Support for multiple exchanges including Binance, Coinbase, Kraken, etc.

### Signals

- AI-powered trading signal generation
- Risk-aware recommendations
- Custom strategy implementation
- Budget-based signal generation

### Perpetual Futures

- Market data and pricing
- Funding rate analysis and predictions
- Position management
- Trading pair discovery
- Asset context analysis
- Historical funding rates
- Trading fee information

### Options

- DeFi options data
- Strategy development
- Risk/reward analysis
- Support for both calls and puts
- Position type flexibility (long/short)

### Asset Price Predictions

- AI-powered price predictions
- Multiple timeframe forecasts (5m and 8h)
- Trend analysis
- Support for major assets (BTC, ETH, SOL, BNB, ARB)

### Altcoins Derivatives

- Tradable entities discovery
- Trading statistics analysis
- Market activity monitoring
- Options market exploration
- Currency-specific trading data

## Implementation Details

### Schema (`schema.ts`)

- Defines tool categories and interfaces
- Contains comprehensive tool guides
- Defines workflow templates
- Implements input validation
- Maintains tool relationships and dependencies

### Handler (`index.ts`)

- Processes user queries
- Matches goals to relevant tools
- Generates formatted responses
- Provides contextual recommendations
- Supports multiple query types (goal-based, category-based, tool-specific)

## Best Practices

1. Start with a clear goal or use case
2. Use category filtering for focused exploration
3. Review related tools for comprehensive solutions
4. Follow suggested workflows for common scenarios
5. Always check parameter requirements before using tools
6. Consider combining tools from different categories for better results

## Integration

The Usage Guide Tool is designed to be the first point of contact for users exploring GRIX's trading tools. It helps users:

1. Discover available tools
2. Understand tool capabilities
3. Follow best practices
4. Implement common workflows
5. Optimize tool usage

## Example Workflows

### Market Analysis

1. Use Trading Indicators for technical analysis
2. Get Asset Price Predictions for trend confirmation
3. Generate Signals for trading recommendations

### Perpetual Futures Trading

1. Discover available trading pairs
2. Analyze asset contexts and market conditions
3. Check funding rates and predictions
4. Monitor trading fees and position limits

### Options Trading

1. Review available options markets
2. Analyze market statistics and liquidity
3. Check underlying asset indicators
4. Select appropriate strikes and expiries

### Altcoins Trading

1. Discover tradable entities
2. Review trading statistics
3. Analyze market activity
4. Monitor technical indicators
