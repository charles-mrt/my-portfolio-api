"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const passport_1 = __importDefault(require("@fastify/passport"));
async function authRoutes(fastify) {
    fastify.get('/login', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
    fastify.get('/auth/google/callback', { preValidation: passport_1.default.authenticate('google', { failureRedirect: '/' }) }, async (req, res) => {
        if (req.user) {
            res.redirect('/dashboard');
        }
        else {
            res.redirect('/'); // Ou redirecione para uma página de erro
        }
    });
    fastify.get('/logout', async (req, res) => {
        req.session.delete(); // Usa o método delete para encerrar a sessão
        res.redirect('/');
    });
}
