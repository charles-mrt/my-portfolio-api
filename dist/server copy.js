"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const project_routes_1 = require("./routes/project.routes");
const oauth2_1 = __importDefault(require("@fastify/oauth2"));
const app = (0, fastify_1.default)({
    logger: { level: 'trace' }
});
app.register(cors_1.default, {
    origin: true,
});
// Registro do plugin OAuth2
app.register(oauth2_1.default, {
    name: 'googleOAuth2',
    credentials: {
        client: {
            id: process.env.GOOGLE_CLIENT_ID,
            secret: process.env.GOOGLE_CLIENT_SECRET,
        },
        auth: oauth2_1.default.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/login/google',
    callbackUri: 'http://localhost:3000/login/google/callback',
});
// ID DE TESTE
//https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=561164936272-71pouuicd3quvqlg7n4aomjevkhs6d4v.apps.googleusercontent.com&redirect_uri=http://localhost:3000/login/google/callback&scope=profile%20email
// // Endpoint para iniciar o fluxo de autenticação
// app.get('/login/google', async (req, reply) => {
//   try {
//     const authorizationUri = await app.googleOAuth2.generateAuthorizationUri(req, reply)
//     reply.redirect(authorizationUri)
//   } catch (err) {
//     req.log.error(err)
//     reply.status(500).send('Failed to generate authorization URI')
//   }
// })
// Endpoint para o callback do Google
app.get('/login/google/callback', async (req, reply) => {
    try {
        const { token } = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
        // Aqui você pode usar o token para obter informações do usuário e criar uma sessão, por exemplo
        console.log("======================");
        console.log('ACESS TOKEN:', token.access_token);
        console.log("======================");
        // Logar uma mensagem de sucesso
        console.log('Google Authentication Successful');
        reply.send({ access_token: token.access_token });
    }
    catch (err) {
        req.log.error(err);
        reply.status(500).send('Failed to get access token');
    }
});
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
