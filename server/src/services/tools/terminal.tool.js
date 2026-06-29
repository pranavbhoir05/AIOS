import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const executeTerminalTool = async (command) => {
    try {
        const { stdout, stderr } = await execAsync(command, {
            timeout: 30000,
            maxBuffer: 1024 * 1024,
        });

        return {
            success: true,
            data: {
                stdout,
                stderr,
            },
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};