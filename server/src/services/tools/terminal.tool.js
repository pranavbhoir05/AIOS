import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const executeTerminalTool = async (command) => {
    try {
        const { stdout, stderr } = await execAsync(command, {
            cwd: process.cwd(),
            maxBuffer: 1024 * 1024,
        });

        return {
            success: true,
            data: {
                stdout,
                stderr,
                exitCode: 0,
            },
        };
    } catch (error) {
        return {
            success: false,
            data: {
                stdout: error.stdout || "",
                stderr: error.stderr || error.message,
                exitCode: error.code ?? 1,
            },
        };
    }
};