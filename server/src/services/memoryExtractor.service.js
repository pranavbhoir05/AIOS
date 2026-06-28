import Memory from "../models/memory.model.js";
import { extractMemoryWithAI } from "./memoryAI.service.js";

const patterns = [
    {
        regex: /my name is (.+)/i,
        category: "personal",
        importance: 10,
    },
    {
        regex: /i live in (.+)/i,
        category: "personal",
        importance: 9,
    },
    {
        regex: /i am from (.+)/i,
        category: "personal",
        importance: 9,
    },
    {
        regex: /my favorite (.+) is (.+)/i,
        category: "preference",
        importance: 8,
    },
    {
        regex: /i like (.+)/i,
        category: "preference",
        importance: 7,
    },
    {
        regex: /i am working on (.+)/i,
        category: "project",
        importance: 9,
    },
    {
        regex: /my goal is (.+)/i,
        category: "goal",
        importance: 10,
    },
];

export const extractMemory = async (userId, message) => {
     console.log("extractMemory() called");
    try {
        const aiMemory = await extractMemoryWithAI(message);

        if (aiMemory.shouldStore) {
            const existing = await Memory.findOne({
                user: userId,
                content: aiMemory.memory,
            });

            if (!existing) {
                await Memory.create({
                    user: userId,
                    content: aiMemory.memory,
                    category: aiMemory.category,
                    importance: aiMemory.importance,
                });
            }

            return;
        }
    } catch (error) {
        console.log("AI memory extraction failed. Falling back to regex.");
    }

    // Fallback to regex
    for (const pattern of patterns) {
        if (pattern.regex.test(message)) {
            const existing = await Memory.findOne({
                user: userId,
                content: message,
            });

            if (!existing) {
                await Memory.create({
                    user: userId,
                    content: message,
                    category: pattern.category,
                    importance: pattern.importance,
                });
            }

            break;
        }
    }
};