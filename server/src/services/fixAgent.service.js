import { exploreProject } from "./projectExplorer.service.js";
import { createPlan } from "./planner.service.js";
import { executePlan } from "./toolRouter.service.js";

const MAX_ITERATIONS = 5;

export const fixBackend = async (message) => {
    const history = [];

    const project = await exploreProject();

    let currentRequest = `
${message}

Project:

${JSON.stringify(project, null, 2)}
`;

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        const plan = await createPlan(currentRequest);

        const results = await executePlan(plan.tasks);

        history.push({
            iteration: i + 1,
            plan,
            results,
        });

        if (!plan.llmQuery) {
            break;
        }

        currentRequest = `
Previous results:

${JSON.stringify(results, null, 2)}

Next task:

${plan.llmQuery}
`;
    }

    return {
        project,
        history,
    };
};