"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const passport_1 = __importDefault(require("@fastify/passport"));
const secure_session_1 = __importDefault(require("@fastify/secure-session"));
const cors_1 = __importDefault(require("@fastify/cors"));
const passport_config_1 = require("./routes/config/passport.config");
const project_routes_1 = require("./routes/project.routes");
const auth_routes_1 = require("./routes/auth.routes");
const app = (0, fastify_1.default)({ logger: true });
app.register(cors_1.default, {
    origin: process.env.ALLOWED_CLIENT,
    credentials: true
});
app.register(secure_session_1.default, {
    cookieName: 'ch_session',
    key: Buffer.from(process.env.SESSION_SECRET_KEY, 'utf-8'),
    cookie: {
        path: '/'
    }
});
app.register(passport_1.default.initialize());
app.register(passport_1.default.secureSession());
(0, passport_config_1.configurePassport)();
app.register(auth_routes_1.authRoutes);
app.register(project_routes_1.projectRoutes, {
    prefix: '/',
});
const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log('🚀 HTTP server running');
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
