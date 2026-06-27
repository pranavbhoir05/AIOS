export const DATABASE_CONFIG = {
    get uri() {
        return process.env.MONGODB_URI;
    },

    get dbName() {
        return process.env.DB_NAME;
    },
};