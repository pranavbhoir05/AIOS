import { TOOLS } from "./toolRegistry.service.js";
import { getToolCatalog } from "./toolCapabilities.service.js";

export const buildToolPrompt = () => {
    const catalog = getToolCatalog(); 
    return JSON.stringify(catalog, null, 2);

    return TOOLS.map((tool) => {
        return `
Tool: ${tool.name}
Description: ${tool.description}
Category: ${tool.category}

Capabilities:
${tool.capabilities.join(", ")}

Requires Input: ${tool.requiresInput}
Produces: ${tool.produces}
Parallel: ${tool.parallel}
Timeout: ${tool.timeout}ms
`;
    }).join("\n");
};