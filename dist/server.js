"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const project_routes_1 = require("./routes/project.routes");
const app = (0, fastify_1.default)({
    logger: true
});
app.register(cors_1.default, {
    origin: true,
});
app.register(project_routes_1.projectRoutes, {
    prefix: '/projects',
});
const start = async () => {
    try {
        await app.listen();
        console.log('🚀 HTTP server running');
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
