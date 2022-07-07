import * as dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config();

export default {
    port: parseInt(process.env.PORT + "", 10) || 8000,
    api: {
        prefix: "/",
    },
};
