import { FastifyInstance } from 'fastify';

export async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/', async (req, res) => {
        if (req.user) {
            return "👋 Hello ${req.user.displayName} 👋";
        } else {
            return '👋 Hello Guest 👋';
        }
    });
}
