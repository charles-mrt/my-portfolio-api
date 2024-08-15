import { FastifyInstance } from 'fastify'
import fastifyPassport from '@fastify/passport'

const loginRedirectUrl = process.env.CLIENT_LOGIN_URL
const dashboardRedirectUrl = process.env.CLIENT_DASHBOARD_URL
const homeRedirectUrl = process.env.CLIENT_HOME_URL

export async function authRoutes(fastify: FastifyInstance) {

  fastify.get('/auth/google/callback', {
    preValidation: fastifyPassport.authenticate('google',
      {
        failureRedirect: `${loginRedirectUrl}?error=authentication_failed`,
        session: true
      }
    )
  },
    async (req, res) => {
      if (req.user) {
        res.redirect(dashboardRedirectUrl!)
      } else {
        res.redirect(loginRedirectUrl!)
      }
    }
  )
  
  fastify.get('/login', fastifyPassport.authenticate('google',
    { scope: ['profile', 'email'] }
  ))

  fastify.get('/logout', async (req, res) => {
    req.session.delete()
    res.redirect(homeRedirectUrl!)
  })
}

