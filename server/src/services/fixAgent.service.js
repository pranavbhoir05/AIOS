import { exploreProject } from "./projectExplorer.service.js";
import { createPlan } from "./planner.service.js";
import { executePlan } from "./toolRouter.service.js";

export const fixBackend = async (message) => {
    const project = await exploreProject();

    const plan = await createPlan(`
${message}

Project information:

${JSON.stringify(project, null, 2)}
`);

    const results = await executePlan(plan.tasks);

    return {
        project,
        plan,
        results,
    };
};