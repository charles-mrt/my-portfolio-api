import { FastifyInstance } from 'fastify';
import fastifyPassport from '@fastify/passport';

export async function authRoutes(fastify: FastifyInstance) {
    fastify.get('/login', fastifyPassport.authenticate('google', { scope: ['profile', 'email'] }));

    fastify.get('/auth/google/callback',
        { preValidation: fastifyPassport.authenticate('google', { failureRedirect: '/' }) },
        async (req, res) => {
            if (req.user) {
                res.redirect('/dashboard');
            } else {
                res.redirect('/'); // Ou redirecione para uma página de erro
            }
        }
    );

    fastify.get('/logout', async (req, res) => {
        req.session.delete(); // Usa o método delete para encerrar a sessão
        res.redirect('/');
    });
}
