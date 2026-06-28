import { executeBrowserOpenTool } from "./services/tools/browser/open.tool.js";
import { executeBrowserExtractTool } from "./services/tools/browser/extract.tool.js";

console.log("Opening...");
const open = await executeBrowserOpenTool("https://example.com");
console.log(open);

console.log("Extracting...");
const extract = await executeBrowserExtractTool();
console.log(extract);