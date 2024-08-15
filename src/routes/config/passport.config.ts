import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import fastifyPassport from '@fastify/passport'
import dotenv from 'dotenv'

dotenv.config()

const allowedEmail = process.env.ALLOWED_EMAIL

if (!allowedEmail) {
  throw new Error('ALLOWED_EMAIL is not defined in .env file')
}

export function configurePassport() {
  fastifyPassport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK!,
  }, (accessToken, refreshToken, profile, cb) => {
    const email = profile.emails && profile.emails[0] && profile.emails[0].value

    if (email === allowedEmail) {
      const user = {
        displayName: profile.displayName || 'No Name'
      }
      cb(null, user)
    } else {
      console.log('Unauthorized access attempt by email:', email)
      cb(null, false)
    }
  }))
  fastifyPassport.registerUserSerializer(async (user, req) => {
    return user
  })
  fastifyPassport.registerUserDeserializer(async (user, req) => {
    return user
  })


}
