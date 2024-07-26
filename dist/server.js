"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const passport_1 = __importDefault(require("@fastify/passport"));
const secure_session_1 = __importDefault(require("@fastify/secure-session"));
const cors_1 = __importDefault(require("@fastify/cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const passport_config_1 = require("./routes/config/passport.config");
const project_routes_1 = require("./routes/project.routes");
const auth_routes_1 = require("./routes/auth.routes");
const user_routes_1 = require("./routes/user.routes");
const app = (0, fastify_1.default)({ logger: true });
app.register(cors_1.default, {
    origin: true,
});
// Registra o plugin de sessão segura
app.register(secure_session_1.default, {
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, '/session-secret-key')),
    cookie: {
        path: '/'
    }
});
// Inicializa o Passport e registra o plugin
app.register(passport_1.default.initialize());
app.register(passport_1.default.secureSession());
// Configura Passport
(0, passport_config_1.configurePassport)();
// Importa e registra as rotas
app.register(auth_routes_1.authRoutes);
app.register(user_routes_1.userRoutes);
app.register(project_routes_1.projectRoutes, {
    prefix: '/projects',
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
