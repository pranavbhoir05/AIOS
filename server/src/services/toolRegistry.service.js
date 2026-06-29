import { executeTimeTool } from "./tools/time.tool.js";
import { executeCalculatorTool } from "./tools/calculator.tool.js";
import { executeWeatherTool } from "./tools/weather.tool.js";
import { executeWebSearchTool } from "./tools/webSearch.tool.js";
import {executeCurrencyTool} from "./tools/currency.tool.js"
import { executeBrowserTool } from "./tools/browser.tool.js";
import { executeBrowserOpenTool } from "./tools/browser/open.tool.js";
import { executeBrowserExtractTool } from "./tools/browser/extract.tool.js";
import {executeReadFileTool} from "./tools/filesystem/readFile.tool.js";
import {executeListDirectoryTool} from "./tools/filesystem/listDirectory.tool.js";
import {executeWriteFileTool} from "./tools/filesystem/writeFile.tool.js";
import {executeSearchFilesTool} from "./tools/filesystem/searchFiles.tool.js";
import {executeReplaceInFileTool} from "./tools/filesystem/replaceInFile.tool.js";
import { executeBrowserClickTool } from "./tools/browser/click.tool.js";
import { executeBrowserTypeTool } from "./tools/browser/type.tool.js";
import { executeBrowserWaitTool } from "./tools/browser/wait.tool.js";
import { executeBrowserScreenshotTool } from "./tools/browser/screenshot.tool.js";


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
{
    name: "read_file",
    description: "Read the contents of a file",

    category: "filesystem",

    capabilities: [
        "read_file",
        "source_code",
        "text_file",
        "configuration"
    ],

    requiresInput: true,

    execute: executeReadFileTool,
},
{
    name: "list_directory",
    description: "List files and folders in a directory",

    category: "filesystem",

    capabilities: [
        "list_files",
        "browse_project",
        "list_directory"
    ],

    requiresInput: false,

    execute: executeListDirectoryTool,
},
{
    name: "write_file",

    description: "Create or overwrite a file",

    category: "filesystem",

    capabilities: [
        "write_file",
        "create_file",
        "edit_file"
    ],

    requiresInput: true,

    execute: executeWriteFileTool,
},
{
    name: "search_files",

    description: "Search for files by name",

    category: "filesystem",

    capabilities: [
        "find_file",
        "search_project",
        "locate_file"
    ],

    requiresInput: true,

    execute: executeSearchFilesTool,
},
{
  "tasks": [
    {
      "tool": "replace_in_file",
      "input": {
        "path": "src/index.js",
        "search": "const port = 3000;",
        "replace": "const port = 8000;"
      }
    }
  ],
  "llmQuery": ""
},
{
    name: "browser_click",

    description: "Click an element on the current webpage",

    category: "browser",

    capabilities: [
        "click",
        "button",
        "link",
        "navigation"
    ],

    requiresInput: true,

    execute: executeBrowserClickTool,
},
{
    name: "browser_type",

    description: "Type text into an input field",

    category: "browser",

    capabilities: [
        "type",
        "fill_form",
        "input_text"
    ],

    requiresInput: true,

    execute: executeBrowserTypeTool,
},
{
    name: "browser_wait",

    description: "Wait for a page, selector, or timeout",

    category: "browser",

    capabilities: [
        "wait",
        "page_load",
        "dynamic_content"
    ],

    requiresInput: false,

    execute: executeBrowserWaitTool,
},
{
    name: "browser_screenshot",

    description: "Capture a screenshot of the current page",

    category: "browser",

    capabilities: [
        "screenshot",
        "capture_page"
    ],

    requiresInput: false,

    execute: executeBrowserScreenshotTool,
},
];