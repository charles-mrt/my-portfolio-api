"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
async function userRoutes(fastify) {
    fastify.get('/', async (req, res) => {
        if (req.user) {
            return "👋 Hello ${req.user.displayName} 👋";
        }
        else {
            return '👋 Hello Guest 👋';
        }
    });
}
