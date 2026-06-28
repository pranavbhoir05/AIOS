export const withTimeout = async (
    promise,
    ms = 10000
) => {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(
                () => reject(new Error("Tool timeout")),
                ms
            )
        ),
    ]);
};