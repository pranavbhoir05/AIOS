export const executeCalculatorTool = async (message) => {
    const expression = message.replace(/[^0-9+\-*/().]/g, "");

    try {
        const result = Function(`return ${expression}`)();

        return {
            success: true,
            data: `${expression} = ${result}`,
        };
    } catch {
        return {
            success: false,
            data: "Invalid calculation",
        };
    }
};