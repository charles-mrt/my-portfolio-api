import fastify from 'fastify'
import fastifyPassport from '@fastify/passport'
import fastifySecureSession from '@fastify/secure-session'
import cors from '@fastify/cors'

import fs from 'fs'
import path from 'path'

import { configurePassport } from './routes/config/passport.config'
import { projectRoutes } from './routes/project.routes'
import { authRoutes } from './routes/auth.routes'

const app = fastify({ logger: true })

app.register(cors, {
  origin:process.env.ALLOWED_CLIENT,  
  credentials: true
})


app.register(fastifySecureSession, {
  cookieName: 'ch_session', 
  key: process.env.SESSION_SECRET_KEY!,
  cookie: {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  }
})
app.register(fastifyPassport.initialize())
app.register(fastifyPassport.secureSession())

configurePassport()


app.register(authRoutes)
app.register(projectRoutes, {
  prefix: '/',
})



const start = async () => {
  try {
    await app.listen({ port: 3000 })
    console.log('🚀 HTTP server running')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()

