import fastify from 'fastify'
import fastifyPassport from '@fastify/passport'
import fastifySecureSession from '@fastify/secure-session'
import cors from '@fastify/cors'

import fs from 'fs'
import path from 'path'

import { configurePassport } from './routes/config/passport.config'
import { projectRoutes } from './routes/project.routes'
import { authRoutes } from './routes/auth.routes'
import { userRoutes} from './routes/user.routes'



const app = fastify({ logger: true })

app.register(cors, {
  origin: true,
})

// Registra o plugin de sessão segura
app.register(fastifySecureSession, {
    key: fs.readFileSync(path.join(__dirname, '/session-secret-key')),
    cookie: {
        path: '/'
    }
})

// Inicializa o Passport e registra o plugin
app.register(fastifyPassport.initialize())
app.register(fastifyPassport.secureSession())

// Configura Passport
configurePassport()

// Importa e registra as rotas
app.register(authRoutes)
app.register(userRoutes)

app.register(projectRoutes, {
  prefix: '/projects',
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

