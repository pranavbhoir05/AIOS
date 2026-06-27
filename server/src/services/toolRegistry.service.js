import { executeTimeTool } from "./tools/time.tool.js";

export const TOOLS = [
    {
        name: "time",
        description: "Current date and time",
        keywords: ["time", "date", "day", "today", "clock"],
        execute: executeTimeTool,
    },
];