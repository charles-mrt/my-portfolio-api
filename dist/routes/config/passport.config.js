"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = configurePassport;
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("@fastify/passport"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const allowedEmail = process.env.ALLOWED_EMAIL;
if (!allowedEmail) {
    throw new Error('ALLOWED_EMAIL is not defined in .env file');
}
function configurePassport() {
    passport_1.default.use('google', new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    }, (accessToken, refreshToken, profile, cb) => {
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;
        if (email === allowedEmail) {
            const user = {
                displayName: profile.displayName || 'No Name'
            };
            cb(null, user);
        }
        else {
            console.log('Unauthorized access attempt by email:', email);
            cb(new Error('Unauthorized'), null);
        }
    }));
    passport_1.default.registerUserDeserializer(async (user, req) => {
        return user;
    });
    passport_1.default.registerUserSerializer(async (user, req) => {
        return user;
    });
}
