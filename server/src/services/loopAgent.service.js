import { createPlan } from "./planner.service.js";
import { executePlan } from "./toolRouter.service.js";

const MAX_ITERATIONS = 5;

export const runLoop = async (message) => {
    let currentRequest = message;

    const history = [];

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        const plan = await createPlan(currentRequest);

        const results = await executePlan(plan.tasks);

        history.push({
            plan,
            results,
        });

        if (!plan.llmQuery) {
            break;
        }

        currentRequest = plan.llmQuery;
    }

    return history;
};