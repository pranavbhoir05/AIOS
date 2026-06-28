import { executeTimeTool } from "./tools/time.tool.js";
import { executeCalculatorTool } from "./tools/calculator.tool.js";
import { executeWeatherTool } from "./tools/weather.tool.js";
import { executeWebSearchTool } from "./tools/webSearch.tool.js";
import {executeCurrencyTool} from "./tools/currency.tool.js"
import { executeBrowserTool } from "./tools/browser.tool.js";
import { executeBrowserOpenTool } from "./tools/browser/open.tool.js";
import { executeBrowserExtractTool } from "./tools/browser/extract.tool.js";


export const TOOLS = [
    {
    name: "browser_open",
    description: "Open a webpage",
    execute: executeBrowserOpenTool,
},
{
    name: "browser_extract",
    description: "Extract text from the current webpage",
    execute: executeBrowserExtractTool,
},
    {
    name: "browser",

    description: "Open websites and extract webpage content",

    category: "web",

    capabilities: [
        "open_website",
        "read_webpage",
        "extract_text",
        "take_screenshot"
    ],

    inputSchema: {
        type: "string",
        description: "A valid URL"
    },

    outputSchema: {
        type: "object",
        properties: {
            title: "string",
            content: "string"
        }
    },

    timeout: 30000,

    parallel: true,

    requiresInput: true,

    produces: "object",

    execute: executeBrowserTool,
},
  {
    name: "time",
    description: "Current date and time",
    outputSchema: {
    type: "object",
    properties: {
        date: "string",
        time: "string",
        timezone: "string"
    }
},
    category: "utility",

    capabilities: [
        "current_time",
        "current_date",
        "day_of_week",
        "timezone"
    ],

    timeout: 2000,
    parallel: true,
    requiresInput: false,
    produces: "text",

    execute: executeTimeTool,
},
   {
    name: "calculator",

    description: "Perform calculations",
    outputSchema: {
    type: "number",
    description: "Calculated result"
},
    category: "math",

    capabilities: [
        "arithmetic",
        "percentage",
        "equations"
    ],

    timeout: 3000,

    parallel: true,

    requiresInput: true,

    produces: "number",

    execute: executeCalculatorTool,
},
    {
    name: "weather",
    description: "Get current weather",
        outputSchema: {
    type: "object",
    properties: {
        temperature: "number",
        condition: "string",
        humidity: "number",
        windSpeed: "number"
    }
},
    category: "information",

    capabilities: [
        "weather",
        "forecast",
        "temperature",
        "humidity",
        "wind"
    ],

    timeout: 10000,
    parallel: true,
    requiresInput: true,
    produces: "text",

    execute: executeWeatherTool,
},
{
    name: "currency",
    description: "Convert currencies",
    outputSchema: {
    type: "object",
    properties: {
        from: "string",
        to: "string",
        amount: "number",
        convertedAmount: "number",
        exchangeRate: "number"
    }
},
    category: "finance",

    capabilities: [
        "currency_conversion",
        "exchange_rate",
        "money_conversion",
        "forex"
    ],

    timeout: 10000,
    parallel: true,
    requiresInput: true,
    produces: "number",

    execute: executeCurrencyTool,
},
{
    name: "search",

    description: "Search the internet",
     inputSchema: {
        type: "string",
        description: "Search query"
    },

    outputSchema: {
        type: "string",
        description: "Search results"
    },
    category: "information",

    capabilities: [
        "latest_news",
        "current_events",
        "web_search",
        "facts_after_knowledge_cutoff"
    ],

    timeout: 10000,

    parallel: true,

    requiresInput: true,

    produces: "text",

    execute: executeWebSearchTool,
},
];