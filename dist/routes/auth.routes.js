"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const passport_1 = __importDefault(require("@fastify/passport"));
const loginRedirectUrl = process.env.CLIENT_LOGIN_URL;
const dashboardRedirectUrl = process.env.CLIENT_DASHBOARD_URL;
const homeRedirectUrl = process.env.CLIENT_HOME_URL;
async function authRoutes(fastify) {
    fastify.get('/auth/google/callback', {
        preValidation: passport_1.default.authenticate('google', {
            failureRedirect: `${loginRedirectUrl}?error=authentication_failed`,
            session: true
        })
    }, async (req, res) => {
        if (req.user) {
            res.redirect(dashboardRedirectUrl);
        }
        else {
            res.redirect(loginRedirectUrl);
        }
    });
    fastify.get('/login', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
    fastify.get('/logout', async (req, res) => {
        req.session.delete();
        res.redirect(homeRedirectUrl);
    });
}
