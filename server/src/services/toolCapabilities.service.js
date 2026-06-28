import { TOOLS } from "./toolRegistry.service.js";

export const getToolCatalog = () => {
    return TOOLS.map((tool) => ({
        name: tool.name,
        description: tool.description,
        category: tool.category,
        capabilities: tool.capabilities,
        inputSchema: tool.inputSchema,
        outputSchema: tool.outputSchema,
        requiresInput: tool.requiresInput,
        produces: tool.produces,
    }));
};